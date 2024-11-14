const ServiceRequest = require('../models/service_request');

exports.createServiceRequest = async (req, res) => {
    const { requesterId, type, title, description, priority } = req.body;
    
    if (!requesterId || !type || !title || !description) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        const serviceRequest = new ServiceRequest({
            requesterId,
            type,
            title,
            description,
            priority: priority || 'medium',
            attachments: req.body.attachments || []
        });
        const result = await serviceRequest.save();
        res.status(201).send({ serviceRequest: result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getServiceRequests = async (req, res) => {
    const { status, type, requesterId } = req.query;
    let query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (requesterId) query.requesterId = requesterId;

    try {
        const serviceRequests = await ServiceRequest.find(query)
            .populate('requesterId', '-password')
            .populate('assignedTo', '-password');
        res.status(200).send({ serviceRequests });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getServiceRequestById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Service Request ID is required." });
    }

    try {
        const serviceRequest = await ServiceRequest.findById(id)
            .populate('requesterId', '-password')
            .populate('assignedTo', '-password');
        if (!serviceRequest) {
            return res.status(404).send({ message: "Service Request not found." });
        }
        res.status(200).send({ serviceRequest });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateServiceRequest = async (req, res) => {
    const { id } = req.params;
    const { status, assignedTo, resolution } = req.body;

    if (!id) {
        return res.status(400).send({ message: "Service Request ID is required." });
    }

    try {
        const serviceRequest = await ServiceRequest.findByIdAndUpdate(
            id,
            { 
                status, 
                assignedTo, 
                resolution,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        )
        .populate('requesterId', '-password')
        .populate('assignedTo', '-password');
        
        if (!serviceRequest) {
            return res.status(404).send({ message: "Service Request not found." });
        }
        res.status(200).send({ serviceRequest });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getAllServiceRequests = async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find()
            .populate('requesterId', '-password')
            .populate('assignedTo', '-password')
            .sort({ createdAt: -1 });
        res.status(200).send({ serviceRequests });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteAllServiceRequests = async (req, res) => {
    try {
        await ServiceRequest.deleteMany({});
        res.status(200).send({ message: "All service requests deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteServiceRequest = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Service Request ID is required." });
    }
    try {
        const serviceRequest = await ServiceRequest.findByIdAndDelete(id);
        if (!serviceRequest) {
            return res.status(404).send({ message: "Service Request not found." });
        }
        res.status(200).send({ message: "Service Request deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}