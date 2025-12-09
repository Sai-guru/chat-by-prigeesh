import express from "express";
import path from "path";
import { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: ENV.NODE_ENV === "production" ? ENV.CLIENT_URL : "*",
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const PORT: number = Number(ENV.PORT) || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const __dirname = path.resolve();

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Express 5 compatible catch-all
  // Catch all remaining routes and serve index.html
  app.use((req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
