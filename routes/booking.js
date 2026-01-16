const express = require("express");
const router = express.Router();
const { db } = require("../firebase/admin");

router.post("/book", async (req, res) => {
  try {
    await db.collection("consultations").add({
      ...req.body,
      status: "Pending",
      createdAt: new Date()
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
