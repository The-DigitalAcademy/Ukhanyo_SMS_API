const StudyMaterial = require('../models/study_material');


exports.createStudyMaterial = async (req, res) => {
    const { course, title, description, fileUrl, uploadedBy } = req.body;

    try {
        const newMaterial = await StudyMaterial.create({
            course,
            title,
            description,
            fileUrl,
            uploadedBy
        });
        res.status(201).json(newMaterial);
    } catch (error) {
        res.status(400).json({ message: "Error creating study material", error });
    }
}


exports.getAllStudyMaterials = async (req, res) => {
    try {
        const materials = await StudyMaterial.find().populate('course uploadedBy');
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving study materials", error });
    }
}


exports.getStudyMaterialById = async (req, res) => {
    const { id } = req.params;

    try {
        const material = await StudyMaterial.findById(id).populate('course uploadedBy');
        if (!material) return res.status(404).json({ message: "Study material not found" });

        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving study material", error });
    }
}


exports.updateStudyMaterial = async (req, res) => {
    const { id } = req.params;
    const { course, title, description, fileUrl, uploadedBy } = req.body;

    try {
        const updatedMaterial = await StudyMaterial.findByIdAndUpdate(
            id, 
            { course, title, description, fileUrl, uploadedBy }, 
            { new: true }
        ).populate('course uploadedBy');

        if (!updatedMaterial) return res.status(404).json({ message: "Study material not found" });

        res.status(200).json(updatedMaterial);
    } catch (error) {
        res.status(400).json({ message: "Error updating study material", error });
    }
}


exports.deleteStudyMaterial = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMaterial = await StudyMaterial.findByIdAndDelete(id);
        if (!deletedMaterial) return res.status(404).json({ message: "Study material not found" });

        res.status(200).json({ message: "Study material deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting study material", error });
    }
}
