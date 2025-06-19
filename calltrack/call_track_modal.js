const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const callTrackingSchema = new mongoose.Schema(
  {
    call_id: { type: Number, unique: true }, // Auto-incremented and required

    direction: { type: String }, // "incoming" or "outgoing"
    mobile_number: { type: String }, // Number involved in the call
    contact_name: { type: String }, // If number is saved in phonebook
    duration: { type: String }, // Duration of the call (e.g. "00:02:34")
    timestamp: { type: Date }, // Call date and time
    status: { type: String }, // "missed", "completed", "rejected", etc.
  },
  { timestamps: true }
);

// Auto-increment plugin
callTrackingSchema.plugin(AutoIncrement, { inc_field: "call_id" });

const CallTracking = mongoose.model("CallTracking", callTrackingSchema);
module.exports = CallTracking;
