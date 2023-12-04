const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const app = express();

const annoceRouter = require("./routes/annonce");
const userRoutes = require("./routes/user");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "*",
    credentials: true,
  })
);

app.use(logger("dev"));

app.use("/api/annonces", annoceRouter);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("UniLog"));

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT || 4000}`);
});
