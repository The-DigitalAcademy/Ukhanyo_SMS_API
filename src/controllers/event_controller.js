const Event = require('../models/event');

exports.createEvent = async (req, res) => {
    const { title, description, startDate, type, targetAudience } = req.body;
    
    if (!title || !description || !startDate || !type || !targetAudience) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        const event = new Event({
            title,
            description,
            startDate,
            type,
            targetAudience,
        });
        const result = await event.save();
        res.status(201).send({ event: result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getEvents = async (req, res) => {
    const { type, targetAudience, isActive } = req.query;
    let query = {};

    if (type) query.type = type;
    if (targetAudience) query.targetAudience = targetAudience;
    if (isActive !== undefined) query.isActive = isActive;

    try {
        const events = await Event.find(query);
        res.status(200).send({ events });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getEventById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Event ID is required." });
    }

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).send({ message: "Event not found." });
        }
        res.status(200).send({ event });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, startDate, endDate, address, type, targetAudience, maxParticipants, isActive } = req.body;

    if (!id) {
        return res.status(400).send({ message: "Event ID is required." });
    }

    try {
        const event = await Event.findByIdAndUpdate(
            id,
            { 
                title, 
                description, 
                startDate,
                type,
                targetAudience,
                isActive
            },
            { new: true, runValidators: true }
        );
        
        if (!event) {
            return res.status(404).send({ message: "Event not found." });
        }
        res.status(200).send({ event });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}