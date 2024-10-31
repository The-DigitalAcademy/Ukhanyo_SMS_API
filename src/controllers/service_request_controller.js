const ServiceRequest = require('../models/service_request');


exports.createServiceRequest = async (req, res) => {
    const { requestedBy, userType, type, description, priority } = req.body;

    try {
        const newRequest = await ServiceRequest.create({
            requestedBy,
            userType,
            type,
            description,
            priority
        });
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(400).json({ message: "Error creating service request", error });
    }
}


exports.getAllServiceRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.find().populate('requestedBy');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving service requests", error });
    }
}


exports.getServiceRequestById = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await ServiceRequest.findById(id).populate('requestedBy');
        if (!request) return res.status(404).json({ message: "Service request not found" });

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving service request", error });
    }
}


exports.updateServiceRequest = async (req, res) => {
    const { id } = req.params;
    const { type, description, status, priority, dateResolved } = req.body;

    try {
        const updatedRequest = await ServiceRequest.findByIdAndUpdate(
            id, 
            { type, description, status, priority, dateResolved },
            { new: true }
        ).populate('requestedBy');
        
        if (!updatedRequest) return res.status(404).json({ message: "Service request not found" });

        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: "Error updating service request", error });
    }
}


exports.deleteServiceRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRequest = await ServiceRequest.findByIdAndDelete(id);
        if (!deletedRequest) return res.status(404).json({ message: "Service request not found" });

        res.status(200).json({ message: "Service request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service request", error });
    }
}
