import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";
import job from "./config/cron.js";

const app = express();
dotenv.config({
  path: "./config/.env",
});

if (process.env.NODE_ENV === "production") {
  job.start();
}

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

dbConnection();
app.get("/", (req, res) => {
  res.send("Express on vercel");
});

app.use(errorMiddleware);

export default app;
