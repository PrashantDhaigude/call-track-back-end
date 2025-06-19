const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB URI
const MONGO_URL = "mongodb+srv://prashantdhaigude530:6Qm0NdPwjKHGLzv0@chatapplication.jrene.mongodb.net/?retryWrites=true&w=majority&appName=chatapplication";

// Connect to MongoDB and only then start the server
async function startServer() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // optional
    });

    console.log("✅ MongoDB Connected");

    // Routes
    const callRoutes = require("./calltrack/call_track_routes");
    const userRoutes = require("./user/user_routes");

    app.get("/", (req, res) => {
      res.send("📞 Call Tracking API Running");
    });

    app.use("/api", callRoutes);
    app.use("/api", userRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
  }
}

startServer(); // 👈 Call the async startup function
