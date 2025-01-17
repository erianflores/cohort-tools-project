const { Schema, model } = require("mongoose");
//define the shape
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//make the model
const UserModel = model("user", userSchema);
module.exports = UserModel;
