require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const candidateRouter = require("./routes/candidateRoutes");

const app = express();

app.use(express.json());

const corsOptions = { origin: process.env.CLIENT_ORIGIN || true };
app.use(cors(corsOptions));

app.use("/auth", authRouter);
app.use("/candidates", candidateRouter);

app.get("/", (req, res) => res.json({ status: "ok" }));

// Start server after DB connection
const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`server started on port: ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

start();
