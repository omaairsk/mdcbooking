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
  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
});

module.exports = router;


fetch("https://yourdomain.com/api/booking/book", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});
