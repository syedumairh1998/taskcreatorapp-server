import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const AuthMiddleware = async (request, response, next) => {
  try {
    dotenv.config();
    const secret = process.env.SECRET_KEY;
    let token;
    let { authorization } = request.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, secret);
      request.user = await User.findById(userID, { password: 0 });
      next();
    } else {
      return response.status(401).json({
        success: false,
        message: "Unauthorized. Token is not provided.",
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(401).json({
      success: false,
      message: "Provided token is invalid .",
      error,
    });
  }
};
