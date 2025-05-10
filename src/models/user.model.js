import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value, "en-IN", { strictMode: false })) {
          throw new Error("Invalid Phone Number: " + value);
        }
      },
    },
  },

  {
    timestamps: true,
  }
);

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHashSavedInDB = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHashSavedInDB
  );

  return isPasswordValid;
};

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
