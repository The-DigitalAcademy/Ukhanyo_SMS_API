const User = require("../models/user_model");

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json({message:"Created user succeffully", savedUser});
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
    const { uuid } = req.params;
    const user = await User.findOne({uuid});
    if (!user) {
      user.dob = user.dob.toISOString().split('T')[0];

      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json({message:"Succefully retrieved user", user});
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not fetch user", error: error.message });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    if(req.params.id === undefined){
      return res.status(404).json({message: "Could not get id"})
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new: true} );
      return res.status(200).json(updatedUser);
    
    
    
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
    res.status(200).json(removedUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};
