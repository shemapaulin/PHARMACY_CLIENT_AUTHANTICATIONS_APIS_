import express from "express";
import dotenv from "dotenv";

import{ database,  db } from './models';
import { userRouter } from "./routes";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
 res.send("Accessed");
});
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port} On ${process.env.NODE_ENV} mode`);
});


db
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
database
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });



