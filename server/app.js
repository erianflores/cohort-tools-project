const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cohorts = require("./cohorts.json");
require("./db/index.js");
require("dotenv").config();
const students = require("./students.json");
const cohortsRoutes = require("./routes/cohorts.routes.js");
const CohortModel = require("./models/Students.model.js");
const studentsRoutes = require("./routes/students.routes.js");
const StudentsModel = require("./models/Students.model.js");
const UserModel = require("./models/User.model.js");
const cors = require("cors");
const authRoutes = require("./routes/user.routes.js");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE.
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/auth", authRoutes);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts);
// });
// app.get("/api/students", (req, res) => {
//   res.json(students);
// });

// Routes imported
app.use("/api/students", studentsRoutes);
app.use("/api/cohorts", cohortsRoutes);
app.use("/auth", authRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//  <== IMPORT
