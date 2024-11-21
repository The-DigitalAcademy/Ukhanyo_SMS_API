const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userModel = require('../models/user_model');

// Use environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || "supersecuresecretkey";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const RESET_TOKEN_EXPIRES = 3600000; // 1 hour in milliseconds

// Utility functions
const getUserByEmail = async (email) => {
    return await userModel.findOne({ email: email }).select('+password');
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePasswords = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};

const generateJWT = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

// Password reset functionality
const generateResetToken = async (email) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Save to user
        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpires = Date.now() + RESET_TOKEN_EXPIRES;
        await user.save();

        return resetToken;
    } catch (error) {
        throw new Error('Error generating reset token');
    }
};


const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        
        if (!token && req.cookies.token) {
            token = `Bearer ${req.cookies.token}`;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is required"
            });
        }

        // Remove Bearer from string
        token = token.startsWith('Bearer ') ? token.slice(7) : token;

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid or expired token"
                });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
};

const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to perform this action"
            });
        }

        next();
    };
};

module.exports = {
    generateResetToken,
    verifyToken,
    authorizeRoles,
    generateJWT,
    hashPassword,
    comparePasswords
};
