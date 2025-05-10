import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import validateSignUpData from "../utils/validation.js";
import { ValidationError } from "../utils/validation.js";

export const signup = async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ emailId });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists. Please login",
        success: false,
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedpassword,
      phoneNumber,
    });

    const savedUser = await user.save();

    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({
        message: "Please fill all the fields.",
        success: false,
      });
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({
        message: "User not found. Please signup!",
        success: false,
      });
    }

    const validPassword = await user.validatePassword(password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    return res.status(200).json({
      message: `Welcome back ${user.firstName}`,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        phoneNumber: user.phoneNumber,
      },
      success: true,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (err) {
    console.log(err);
  }
};
