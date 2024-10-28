const User = require("../models/enrollment_model");

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not fetch user", error: error.message });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not fetch user", error: error.message });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.params.id });
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.send({ message: "All users deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not delete", error: error.message });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    res.json(removedUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};
