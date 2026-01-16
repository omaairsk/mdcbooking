require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const PDFDocument = require("pdfkit");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- FIREBASE ADMIN ---------- */
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
  storageBucket: process.env.FB_BUCKET
});
const db = admin.firestore();

/* ---------- AUTH HELPERS ---------- */
function auth(req,res,next){
  try{
    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  }catch{
    res.sendStatus(401);
  }
}

/* ---------- PATIENT LOGIN ---------- */
app.post("/api/patient/login", async (req,res)=>{
  const { mobile } = req.body;
  const snap = await db.collection("patients")
    .where("mobile","==",mobile).get();

  let id;
  if(snap.empty){
    const ref = await db.collection("patients").add({ mobile });
    id = ref.id;
  } else id = snap.docs[0].id;

  const token = jwt.sign({ role:"patient", id }, process.env.JWT_SECRET);
  res.json({ token });
});

/* ---------- BOOK APPOINTMENT ---------- */
app.post("/api/book", auth, async (req,res)=>{
  const data = {
    ...req.body,
    patientId: req.user.id,
    status:"Pending",
    createdAt:new Date()
  };
  await db.collection("consultations").add(data);
  res.json({ success:true });
});

/* ---------- PATIENT HISTORY ---------- */
app.get("/api/history", auth, async (req,res)=>{
  const snap = await db.collection("consultations")
    .where("patientId","==",req.user.id).get();
  res.json(snap.docs.map(d=>d.data()));
});

/* ---------- ADMIN LOGIN ---------- */
app.post("/api/admin/login",(req,res)=>{
  if(req.body.password === process.env.ADMIN_PASS){
    const token = jwt.sign({ role:"admin" }, process.env.JWT_SECRET);
    res.json({ token });
  } else res.sendStatus(401);
});

/* ---------- ADMIN DASHBOARD ---------- */
app.get("/api/admin/all", auth, async (req,res)=>{
  const snap = await db.collection("consultations").get();
  res.json(snap.docs.map(d=>({id:d.id,...d.data()})));
});

/* ---------- UPDATE STATUS + MEET ---------- */
app.put("/api/admin/update/:id", auth, async (req,res)=>{
  await db.collection("consultations").doc(req.params.id).update(req.body);

  await db.collection("audit_logs").add({
    action:"UPDATE",
    by:req.user.role,
    data:req.body,
    time:new Date()
  });

  res.json({success:true});
});

/* ---------- PDF PRESCRIPTION ---------- */
app.get("/api/prescription/:id", auth, async (req,res)=>{
  const doc = new PDFDocument();
  res.setHeader("Content-Type","application/pdf");
  doc.pipe(res);
  doc.fontSize(18).text("Medical Diagnostic Centre");
  doc.moveDown();
  doc.fontSize(12).text("Prescription ID: "+req.params.id);
  doc.text("Doctor: Assigned Doctor");
  doc.text("Medicines: As advised");
  doc.end();
});

/* ---------- ANALYTICS ---------- */
app.get("/api/admin/analytics", auth, async (req,res)=>{
  const snap = await db.collection("consultations").get();
  const total = snap.size;
  const completed = snap.docs.filter(d=>d.data().status==="Completed").length;
  res.json({ total, completed });
});

/* ---------- START ---------- */
app.listen(5000,()=>console.log("RUNNING ON 5000"));
