const User = require("./user_model");

// Create
exports.createUser = async (req, res) => {
  try {
    const { user_name, user_email, user_mob, user_password } = req.body;

    const newUser = new User({
      user_name,
      user_email,
      user_mob,
      user_password,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { user_id: req.body.user_id },
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated successfully", status: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 1 });
  }
};

// Delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ user_id: req.body.user_id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully", status: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
