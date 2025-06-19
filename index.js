const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://prashantdhaigude530:6Qm0NdPwjKHGLzv0@chatapplication.jrene.mongodb.net/?retryWrites=true&w=majority&appName=chatapplication",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Default route
app.get("/", (req, res) => res.send("📞 Call Tracking API Running"));

// RoutesS
const callRoutes = require("./calltrack/call_track_routes");
const userRoutes = require("./user/user_routes");
// app.get("/", (req, res) => {
//   res.send("Hello from Express!");
// });

app.use("/api", callRoutes); // e.g., POST /api/calltrack/store
app.use("/api", userRoutes); // e.g., POST /api/user/store

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
