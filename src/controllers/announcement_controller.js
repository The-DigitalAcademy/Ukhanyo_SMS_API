const Announcement = require('../models/announcement');

exports.createAnnouncement = async (req, res) => {
    const { title, content, createdBy, targetAudience, expiryDate } = req.body;
    
    if (!title || !content || !createdBy || !targetAudience) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        const announcement = new Announcement({
            title,
            content,
            createdBy,
            targetAudience,
            expiryDate
        });
        const result = await announcement.save();
        res.status(201).send({ announcement: result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getAnnouncementById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Announcement ID is required." });
    }

    try {
        const announcement = await Announcement.findById(id)
            .populate('createdBy', '-password');
        if (!announcement) {
            return res.status(404).send({ message: "Announcement not found." });
        }
        res.status(200).send({ announcement });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateAnnouncement = async (req, res) => {
    const { id } = req.params;
    const { title, content, targetAudience, expiryDate, isActive } = req.body;

    if (!id) {
        return res.status(400).send({ message: "Announcement ID is required." });
    }

    try {
        const announcement = await Announcement.findByIdAndUpdate(
            id,
            { 
                title, 
                content, 
                targetAudience, 
                expiryDate,
                isActive
            },
            { new: true, runValidators: true }
        )
        .populate('createdBy', '-password');
        
        if (!announcement) {
            return res.status(404).send({ message: "Announcement not found." });
        }
        res.status(200).send({ announcement });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteAnnouncement = async (req, res) => {
    const { id } = req.params;

    try {
      const announcement = await Announcement.findById(id);
      if (!announcement) {
        return res.status(404).json({
          success: false,
          message: 'Announcement not found'
        });
      }
  
      // Perform the deletion
      await Announcement.findByIdAndDelete(id);
  
      return res.status(200).json({
        success: true,
        message: 'Announcement deleted successfully'
      });
  
    } catch (error) {
      return res.status(500).json({ message: "Server error." });
    }
}