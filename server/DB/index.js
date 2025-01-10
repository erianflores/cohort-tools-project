const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Mini_Project")
  .then(() => {
    console.log("Conected to the database");
  })
  .catch((err) => console.log(err));
