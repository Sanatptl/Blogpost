import express from "express";
import cors from "cors";

import postRoute from "./routes/postRoute.js";
import errorController from "./controllers/errorController.js";

//

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/v1/posts", postRoute);

//express global-error-handler middleware
app.use(errorController);

export default app;
