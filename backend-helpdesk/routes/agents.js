import express from "express";
import Agent from "../models/Agent.js";

const router = express.Router();

// GET tous les agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
