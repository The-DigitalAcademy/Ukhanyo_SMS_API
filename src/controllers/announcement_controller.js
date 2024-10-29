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
const Announcement = require('../models/announcement');

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  const { title, content, author, targetAudience } = req.body;

  const newAnnouncement = new Announcement({
    title,
    content,
    author,
    targetAudience,
  });

  try {
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an announcement
exports.updateAnnouncement = async (req, res) => {
  const { title, content, author, targetAudience } = req.body;

  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, author, targetAudience },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteAnnouncement = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
