const StudyMaterial = require('../models/study_material');


exports.createStudyMaterial = async (req, res) => {
    const { title, description, subject, fileUrl, uploadedBy } = req.body;
    
    if (!title || !subject || !fileUrl || !uploadedBy) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        const studyMaterial = new StudyMaterial({
            title,
            description,
            subject,
            fileUrl,
            uploadedBy
        });
        const result = await studyMaterial.save();
        res.status(201).send({ studyMaterial: result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getStudyMaterials = async (req, res) => {
    try {
        const studyMaterials = await StudyMaterial.find({})
            .populate('subject')
            .populate('uploadedBy');
        res.status(200).send({ studyMaterials });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getStudyMaterialById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Study Material ID is required." });
    }

    try {
        const studyMaterial = await StudyMaterial.findById(id)
            .populate('subject')
            .populate('uploadedBy');
        if (!studyMaterial) {
            return res.status(404).send({ message: "Study Material not found." });
        }
        res.status(200).send({ studyMaterial });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateStudyMaterial = async (req, res) => {
    const { id } = req.params;
    const { title, description, fileUrl } = req.body;

    if (!id) {
        return res.status(400).send({ message: "Study Material ID is required." });
    }

    try {
        const studyMaterial = await StudyMaterial.findByIdAndUpdate(
            id,
            { 
                title, 
                description, 
                fileUrl,
                lastUpdated: Date.now() 
            },
            { new: true, runValidators: true }
        )
        .populate('subject')
        .populate('uploadedBy');
        
        if (!studyMaterial) {
            return res.status(404).send({ message: "Study Material not found." });
        }
        res.status(200).send({ studyMaterial });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}