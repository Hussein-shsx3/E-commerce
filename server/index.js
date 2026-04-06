import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import registerRoute from "./routes/register.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import productsRoute from "./routes/productsRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://e-commerce-black-alpha-68.vercel.app",
    ],
    credentials: true,
  })
);

dotenv.config();
const KEEP_ALIVE_URL = process.env.KEEP_ALIVE_URL;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use("/api/register", registerRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/product", productsRoute);
app.use("/api/orders", orderRoute);

app.use(errorHandler);
app.use(notFound);

const pingKeepAlive = async () => {
  if (!KEEP_ALIVE_URL) {
    return;
  }

  try {
    await fetch(KEEP_ALIVE_URL);
  } catch (error) {
    console.log("Keep-alive ping failed:", error.message);
  }
};

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
      pingKeepAlive();
      if (KEEP_ALIVE_URL) {
        setInterval(pingKeepAlive, 14 * 60 * 1000);
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
