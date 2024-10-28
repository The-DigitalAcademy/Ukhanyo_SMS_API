const Event = require('../models/event');
const Course = require('../models/course');


exports.createEvent = async (req, res) => {
    try {
        const { courseId, name, date, description } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const event = new Event({
            class: courseId,
            name,
            date,
            description
        });

        await event.save();

        course.events.push(event._id);
        await course.save();

        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err.message });
    }
}


exports.getCourseEvents = async (req, res) => {
    try {
        const { courseId } = req.params;
        const events = await Event.find({ class: courseId });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err.message });
    }
}


exports.getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching event', error: err.message });
    }
}


exports.updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { name, date, description } = req.body;

        const event = await Event.findByIdAndUpdate(eventId, { name, date, description }, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error updating event', error: err.message });
    }
}


exports.deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findByIdAndDelete(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.status(200).json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err.message });
    }
}
