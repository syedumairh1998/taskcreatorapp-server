import mongoose from "mongoose";
const { Schema } = mongoose;

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required for user"],
  },
  email: {
    type: String,
    required: [true, "email is required for user"],
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "password is required for user"],
  },
});

export const User = mongoose.model("user", userSchema);
