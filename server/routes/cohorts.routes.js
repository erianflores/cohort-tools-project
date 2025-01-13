const express = require("express");
const router = express.Router();
const cohortsModel = require("../models/Cohort.model");

// Routes for Cohorts created and exported here
router.post("/", async (req, res) => {
  try {
    const cohort = await cohortsModel.create(req.body);
    res.status(201).json(cohort);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cohorts = await cohortsModel.find();
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const cohort = await cohortsModel.findById(req.params.cohortId);
    if (!cohort) return res.status(404).json({ error: "Cohort not found" });
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:cohortId", async (req, res) => {
  try {
    const cohort = await cohortsModel.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    if (!cohort) return res.status(404).json({ error: "Cohort not found" });
    res.status(200).json(cohort);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:cohortId", async (req, res) => {
  try {
    const cohort = await cohortsModel.findByIdAndDelete(req.params.cohortId);
    if (!cohort) return res.status(404).json({ error: "Cohort not found" });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
