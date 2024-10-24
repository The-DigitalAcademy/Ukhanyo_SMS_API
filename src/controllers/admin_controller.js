const Admin = require("../models/admin");

exports.createAdmin = async (req, res) => {
  const newAdmin = new Admin(req.body);
  try {
    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// exports.getAllEducators = async (req, res) => {
//   try {
//     const educators = await Educator.find();
//     res.send(educators);
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: "Could not fetch educators", error: error.message });
//   }
// };

exports.getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not fetch admin", error: error.message });
  }
};

// exports.updateEducator = async (req, res) => {
//   try {
//     const updatedEducator = await Educator.updateOne({ _id: req.params.id });
//     res.json(updatedEducator);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };