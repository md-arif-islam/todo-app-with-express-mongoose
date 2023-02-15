const express = require("express");
const router = express.Router();

// GET ALL THE TODOS
router.get("/", async (req, res) => {});

// GET A TODO BY ID
router.get("/:id", async (req, res) => {});

// POST TODO
router.post("/", async (req, res) => {});

// POST MULTPLE TODO
router.post("/all", async (req, res) => {});

// PUT TODO
router.post("/:id", async (req, res) => {});

// DELETE TODO
router.post("/:id", async (req, res) => {});

module.exports = router;
