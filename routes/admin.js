const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { db } = require("../firebase/admin");

router.get("/consultations", auth, async (req, res) => {
  const snap = await db.collection("consultations").get();
  const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json(data);
});

router.put("/update/:id", auth, async (req, res) => {
  await db.collection("consultations").doc(req.params.id).update(req.body);
  res.json({ success: true });
});

module.exports = router;
