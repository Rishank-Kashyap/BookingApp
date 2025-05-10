import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found. Unauthorized access",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
    });
  }
};

export default userAuth;