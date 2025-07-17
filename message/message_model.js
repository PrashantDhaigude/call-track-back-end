const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const MessageSchema = new mongoose.Schema(
  {
    message_id: { type: Number, unique: true },
    message_user_device: { type: String, required: false }, 
    message: { type: String, required: false }, 
    message_status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

MessageSchema.plugin(AutoIncrement, { inc_field: "message_id" });

module.exports = mongoose.model("Message", MessageSchema);
