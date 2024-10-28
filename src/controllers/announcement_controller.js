const Announcement = require('../models/announcement');
const Course = require('../models/course');

exports.createAnnouncement = async (req, res) => {
    try {
        const { courseId, title, message } = req.body;
        const teacherId = req.user._id;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const announcement = new Announcement({
            class: courseId, // Use "class" field since it's still in the model
            title,
            message,
            createdBy: teacherId
        });

        await announcement.save();
        res.status(201).json(announcement);
    } catch (err) {
        res.status(500).json({ message: 'Error creating announcement', error: err.message });
    }
}

exports.getAnnouncementsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const announcements = await Announcement.find({ class: courseId });
        res.status(200).json(announcements);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching announcements', error: err.message });
    }
}

// needed??
exports.updateAnnouncement = async (req, res) => {
    try {
        const { announcementId } = req.params;
        const { title, message } = req.body;

        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            announcementId,
            { title, message },
            { new: true }
        );

        if (!updatedAnnouncement) return res.status(404).json({ message: 'Announcement not found' });
        
        res.status(200).json(updatedAnnouncement);
    } catch (err) {
        res.status(500).json({ message: 'Error updating announcement', error: err.message });
    }
}

exports.deleteAnnouncement = async (req, res) => {
    try {
        const { announcementId } = req.params;
        const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);

        if (!deletedAnnouncement) return res.status(404).json({ message: 'Announcement not found' });
        
        res.status(200).json({ message: 'Announcement deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting announcement', error: err.message });
    }
}
