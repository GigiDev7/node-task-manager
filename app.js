const express = require("express");
const app = express();
const taskRouter = require("./routes/task");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/errorHandler");

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes

app.use("/api/v1/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);

//server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to DB...");
    app.listen(port, () => {
      console.log(`server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
