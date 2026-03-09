import express, { request } from "express";
import { mongodbURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/backmodels.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
//Cors will  be used as a middleware
//OPTION1:This will allow all the requests
app.use(cors());

//OPTION2:THIS will allow only custom values
//app.use(cors({origin:[],methods:[],allowedHeaders:[]}))
//Welcome message
app.get("/", (req, res) => {
  console.log(res);
  return res.status(203).send("Welcome to the Book store"); //204 nhi use karna
});
app.use("/api/books", bookRoutes);
//Use to connect the database

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("databse connected successfully");
    app.listen(PORT, () =>
      console.log(`Example app listening on port ${PORT}!`),
    );
  })
  .catch((err) => {
    console.log("failed", err.message);
  });
module.exports = app;
