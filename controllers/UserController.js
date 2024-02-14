import mongoose from "mongoose";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const createUser = async (request, response) => {
  try {
    const { email, user_name, password, confirm_password } = request.body;
    if (password !== confirm_password) {
      return response.status(400).json({
        message: `Password and confirm password field is not matching`,
      });
    }
    const userExists = await User.findOne({ name: user_name });
    if (userExists) {
      return response.status(201).json({
        message: `This username is already taken. Please try different username`,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: user_name,
      email,
      password: hashedPassword,
    });
    const data = await newUser.save();
    if (data) {
      return response
        .status(201)
        .json({ success: true, message: "User has been created successfully" });
    }
    throw "Unable to create user";
  } catch (error) {
    console.log(error);
    response
      .status(201)
      .json({ success: false, message: "Whoop! Something went wrong" });
  }
};

export const userLogin = async (request, response) => {
  const { user_name, password } = request.body;
  const user = await User.findOne({ name: user_name });
  if (!user) {
    return response
      .status(404)
      .json({ success: false, message: "User not found." });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return response.status(401).json({
      success: false,
      message: "Unauthorized. Please provide valid credentials.",
    });
  }

  dotenv.config();
  const secret = process.env.SECRET_KEY;
  const token = jwt.sign({ userID: user._id }, secret, {
    expiresIn: "1d",
  });

  user["password"] = null;

  return response.status(200).json({
    success: true,
    message: "User has successfully logged in",
    userData: user,
    token,
    status: 200,
  });
};
