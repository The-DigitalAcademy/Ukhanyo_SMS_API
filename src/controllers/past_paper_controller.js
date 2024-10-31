const PastPaper = require('../models/past_paper')

exports.createPaper = async (req, res) => {
  try {
    const paper = new PastPaper(req.body);
const savedPaper = await paper.save();
    res.status(201).json(savedPaper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPapers = async (req, res) => {
  try {
    const papers = await PastPaper.find();
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllPapers = async (req,res) => {
  try {
    await PastPaper.deleteMany({});
    res.status(204).send("deleted all papers");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePaper = async (req, res) => {
  try {
 const updatePaper = await PastPaper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatePaper) {
      return res.status(404).json({ error: 'Paper not found' });
    }
    
    res.status(200).json(updatePaper);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};



exports.deletePaper = async (req,res) => {
  try {
   const deletedpaper= await PastPaper.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedpaper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPaperById = async (req,res) => {
  try {
   const paper= await PastPaper.findById(req.params.id);
    res.status(200).json(paper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateAllPapers = async (req,res) => {
  try {
    const updateAllPapers = await PastPaper.updateMany({}, req.body)
    res.status(200).json (updateAllPapers);
  } catch (error) {
    res.status(500).json({ error:err})
  }
};