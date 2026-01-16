require("dotenv").config();
const express = require("express");
const cors = require("cors");

const booking = require("./routes/booking");
const auth = require("./routes/auth");
const admin = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/booking", booking);
app.use("/api/auth", auth);
app.use("/api/admin", admin);

app.listen(process.env.PORT, () => {
  console.log("Backend running on port", process.env.PORT);
});
