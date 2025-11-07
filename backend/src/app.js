import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import routes from "./routes/index.route.js"; // updated import

dotenv.config();

const app = express();

const DEFAULT_CORS_ORIGIN = "http://localhost:5173";
const allowedOrigins = (process.env.CORS_ORIGIN || DEFAULT_CORS_ORIGIN)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      // Non-browser or same-origin request (e.g. curl, Postman)
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Vary", "Origin");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Middleware to parse JSON and URL-encoded requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to database
dbConnect();

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to Vibe Commerce API");
});

// API routes
app.use("/api", routes); // mount all routes under /api

// Central error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  if (err.message && err.message.startsWith("Origin")) {
    return res.status(403).json({
      statusCode: 403,
      message: err.message,
      success: false,
      errors: [],
    });
  }

  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    success: false,
    errors: err.errors || [],
  });
});

export default app;