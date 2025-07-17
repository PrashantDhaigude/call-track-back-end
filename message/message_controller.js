const Message = require("./message_model");

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { message_user_device, message } = req.body;
    const newMessage = await Message.create({ message_user_device, message });
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findOne({ message_id: req.params.id });
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update message by ID
exports.updateMessage = async (req, res) => {
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { message_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.status(200).json({ success: true, data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findOneAndDelete({ message_id: req.params.id });
    if (!deletedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
