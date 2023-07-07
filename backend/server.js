import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//
import app from "./app.js";

//

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
console.log(process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((connection) => {
    // console.log(connection.connections);
    console.log("connected to database");
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`server statred on port ${port}`)
);

//

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  //and then shutdown our application using .exit
  server.close(() => {
    process.exit(1);
  });
});
