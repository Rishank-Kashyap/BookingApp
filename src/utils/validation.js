import validator from "validator";

class ValidationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "ValidationError";
    this.status = status;
  }
}

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, phoneNumber } = req.body;

  const errors = [];

  if (!firstName || !lastName) {
    errors.push("Name is not valid");
  }

  if (!validator.isEmail(emailId)) {
    errors.push("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    errors.push("Password is not strong");
  }

  if (!validator.isMobilePhone(phoneNumber, "en-IN", { strictMode: false })) {
    errors.push("Invalid Phone Number");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "), 422);
  }
};

export default validateSignUpData;
export { ValidationError };
