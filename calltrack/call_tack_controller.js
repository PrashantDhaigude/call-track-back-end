const CallTrack = require("./call_track_modal");


const getNextId = async (model, idField) => {
  const lastDoc = await model
    .findOne()
    .sort({ [idField]: -1 })
    .limit(1);
  return lastDoc ? lastDoc[idField] + 1 : 1;
};

exports.createCallTrack = async (req, res) => {
  try {
    const {
      direction,
      mobile_number,
      contact_name,
      duration,
      timestamp,
      status,
    } = req.body;
    const call_track_id = await getNextId(CallTrack, "call_track_id");
    const newEntry = new CallTrack({
      call_track_id,
      direction,
      mobile_number,
      contact_name,
      duration,
      timestamp,
      status,
    });
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCallTracks = async (req, res) => {
  try {
    const list = await CallTrack.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCallTrackById = async (req, res) => {
  try {
    const item = await CallTrack.findOne({ call_track_id: req.params.id });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
