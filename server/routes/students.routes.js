const express = require("express");
const router = express.Router();
const studentsModel = require("../models/Students.model");

// Routes for students created and exported here
router.post("/", async (req, res) => {
  try {
    const student = await studentsModel.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await studentsModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const students = await studentsModel.find({ cohort: req.params.cohortId });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const student = await studentsModel.findById(req.params.studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const student = await studentsModel.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const student = await studentsModel.findByIdAndDelete(req.params.studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
