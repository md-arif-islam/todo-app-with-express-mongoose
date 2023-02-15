const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

// Express app init
const app = express();
app.use(express.json());

// Database connection with mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => {
    console.log("Successfully connected!");
  })
  .catch((err) => console.log(err));

// Application routes
app.use("/todo", todoHandler);

// Default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

// Server
app.listen(3000, () => {
  console.log("App listening at port 3000");
});
