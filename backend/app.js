import express from "express";
import cors from "cors";

import postRoute from "./routes/postRoute.js";
import errorController from "./controllers/errorController.js";

//

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://blogmanagement-sanat.netlify.app/",
    credentials: true,
  })
);
app.use("/api/v1/posts", postRoute);

//express global-error-handler middleware
app.use(errorController);

export default app;
