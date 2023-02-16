const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const todoSchema = require("../Schemas/todoSchema");

// Model
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", (req, res) => {
  Todo.find({ status: "active" })
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    });
});

// GET A TODO by ID
router.get("/:id", (req, res) => {
  Todo.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Success",
      });
    }
  });
});

// POST A TODO
router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    }
  });
});

// POST MULTIPLE TODO
router.post("/all", (req, res) => {
  Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully!",
      });
    }
  });
});

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(
//       req.params.id,
//       { $set: { status: "inactive" } },
//       { new: true, useFindAndModify: false }
//     );
//     res.status(200).json({
//       message: "Todo was updated successfully!",
//       updatedTodo: updatedTodo,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "There was a server side error!",
//     });
//   }
// });

// PUT TODO
router.put("/:id", (req, res) => {
  const result = Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully!",
        });
      }
    }
  );
  console.log(result);
});

// DELETE TODO
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was deleted successfully!",
      });
    }
  });
});

module.exports = router;
