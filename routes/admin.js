const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { db } = require("../firebase/admin");

router.get("/consultations", auth, async (req, res) => {
  const snap = await db.collection("consultations").orderBy("createdAt", "desc").get();
  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});

router.put("/update/:id", auth, async (req, res) => {
  await db.collection("consultations").doc(req.params.id).update(req.body);
  res.json({ success: true });
});

module.exports = router;
