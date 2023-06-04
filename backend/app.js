import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from './routes/users.js';

import mongoDB from "./db.js";
mongoDB();

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// The cors middleware can be used to enable cross-origin requests for specific routes or for the entire application. //
app.use(cors());

app.get("/", (req, res) => {
  res.send("App is Running!");
});
// it helps me to remove that dependency error which appear in the console
app.use(express.json());

app.use("/posts", postRoutes);
app.use('/user', userRoutes)

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});