const express = require("express");
const path = require("path");
require("./src/db/mongoose");
const User = require("./src/models/user");
const Task = require("./src/models/task");
const userRouter = require("./src/routers/user");
const taskRouter = require("./src/routers/task");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Parse the incoming data to json object
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", taskRouter);

// Set static folder
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get('*', function (req, res) {
  const index = path.join(__dirname, 'frontend', 'build', 'index.html');
  res.sendFile(index);
});

app.listen(port, () => {
  console.log("Server is up on " + port);
});
