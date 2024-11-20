const Event = require('../models/event');
const Subject = require('../models/subject');


exports.createEvent = async (req, res) => {
    try {

        const subject = await Subject.findOne({subjectCode: req.body.subjectCode});
        if (!subject) return res.status(404).json({ message: 'Subject not found' });

        const event = new Event({
            class: subject.id,
            ...req.body
        });

        await event.save();

        subject.events.push(event.id);
        await subject.save();

        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err.message });
    }
}

exports.createE = async (req, res) => {
    try {
        const event = new Event({

            ...req.body
        });
        console.log(event)
        await event.save();

        // subject.events.push(event.id);
        // await subject.save();

        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err.message });
    }
}

exports.geAllEvents = async (req, res)=>{
    try {
        const events = await Event.find().populate('class').populate('createdBy')
        if (!events) return res.status(404).json({ message: 'Events not found' });

        res.status(201).json(events);
    } catch (error) {
        res.status(500).json({ message: 'A server error occured while getting all events', error: err.message });
    }
}


exports.getCourseEvents = async (req, res) => {
    try {
        const subjectId = req.params.id;
        const events = await Event.find({ class: subjectId });
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
        const eventId =req.params.id 
        const subject = await Subject.findOne({subjectCode: req.body.subjectCode});
        if (!subject) return res.status(404).json({ message: 'Subject not found' });

        const updatedEvent =  await Event.findByIdAndUpdate(eventId,{
            class: subject.id,
            ...req.body
        }, {new: true}).populate('class').populate('createdBy');
        if (!updatedEvent) return res.status(404).json({ message: 'Could not find and update event' });
        
        subject.events.push(updatedEvent.id);
        await subject.save();

        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json({ message: 'Error updating event', error: err.message });
    }
}


exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findByIdAndDelete(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.status(200).json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err.message });
    }
}
