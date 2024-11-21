const User = require('../models/user_model')
const { Clerk } = require('@clerk/clerk-sdk-node');
const crypto = require('crypto');

// Initialize Clerk
const clerk = new Clerk({
    secretKey: process.env.CLERK_SECRET_KEY
});

// Middleware to verify Clerk session token
const verifyClerkToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                code: 'auth/no-token',
                message: 'No authentication token provided',
                details: 'Please include a Bearer token in the Authorization header'
            });
        }

        const token = authHeader.split('Bearer ')[1];
        
        try {
            const session = await clerk.sessions.verifySession(token);
            req.user = session;
            next();
        } catch (clerkError) {
            console.error('Clerk auth error:', clerkError);
            
            switch (clerkError.code) {
                case 'session_expired':
                    return res.status(401).json({
                        code: 'auth/session-expired',
                        message: 'Your session has expired',
                        details: 'Please log in again to get a new token'
                    });
                case 'session_invalid':
                    return res.status(401).json({
                        code: 'auth/invalid-session',
                        message: 'Invalid session',
                        details: 'Please log in again'
                    });
                default:
                    return res.status(401).json({
                        code: 'auth/unknown',
                        message: 'Authentication failed',
                        details: clerkError.message
                    });
            }
        }
    } catch (error) {
        console.error('Unexpected error during auth:', error);
        return res.status(500).json({
            code: 'auth/internal-error',
            message: 'Internal server error during authentication',
            details: 'Please try again later'
        });
    }
};

// User management handlers
const authHandlers = {
    // Create user in both Clerk & database
    createUser: async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ message: "Form fields cannot be empty!" });
            }

            // Generate a random password
            const generatedPassword = crypto.randomBytes(16).toString('hex');

            // Create user in Clerk
            const clerkUser = await clerk.users.createUser({
                emailAddress: req.body.email,
                password: generatedPassword,
                firstName: req.body.name,
                lastName: req.body.last_name
            });

            // Create user in database
            const user = new User({
                ...req.body,
                uuid: clerkUser.id,
                password: generatedPassword
            });
            
            await user.save();

            // Send welcome email with password
            await clerk.emails.createEmail({
                fromEmailName: 'UKHANYO',
                subject: 'Welcome to Your App',
                body: `Your temporary password is: ${generatedPassword}. Please change it upon first login.`,
                emailAddressId: clerkUser.emailAddresses[0].id
            });

            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        }
    },

    // Login handler
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const signInAttempt = await clerk.signIn.create({
                identifier: email,
                password
            });

            if (signInAttempt.status === 'complete') {
                const { token } = signInAttempt.createdSessionId;
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Login failed', error: err.message });
        }
    },

    // Password reset request
    requestPasswordReset: async (req, res) => {
        try {
            const { email } = req.body;
            
            await clerk.users.createPasswordResetToken({
                emailAddress: email
            });

            res.json({ message: 'Password reset email sent' });
        } catch (err) {
            res.status(500).json({ message: 'Error requesting password reset', error: err.message });
        }
    },

    // Reset password with token
    resetPassword: async (req, res) => {
        try {
            const { token, newPassword } = req.body;
            
            await clerk.users.resetPassword({
                token,
                newPassword
            });

            res.json({ message: 'Password successfully reset' });
        } catch (err) {
            res.status(500).json({ message: 'Error resetting password', error: err.message });
        }
    }
};

module.exports = {
    verifyClerkToken,
    authHandlers
};