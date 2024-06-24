const mongoose = require("mongoose");
const validator = require("validator");
const Admin = require("../Models/Admin.Model");

const { generateAccessToken } = require("../Utils/generateAccessToken");

const { generateRefreshToken } = require("../Utils/generateRefreshToken");

//Admin signup
const adminSignUp = async (req, res) => {
  console.log("adminsignup");
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName, lastName, email, password);
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .send({ error: "Must provide name, email and password" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: "Email is not valid" });
  }

  try {
    const userFind = await Admin.findOne({ email });

    if (userFind) {
      return res.status(400).send({
        error:
          "Duplicate Email, please enter a diiferent email or signin using the email",
      });
    }

    const user = new Admin({ firstName, lastName, email, password });

    await user.save();

    res.status(200).send({ msg: "Signup Complete" });
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

// Admin signin
const adminSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({ error: "Must provide email and password" });
  }

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(401).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);

    const accessToken = await generateAccessToken({
      _id: user._id,
      roles: user.role,
      fName: user.firstName,
      lName: user.lastName,
    });

    const refreshToken = await generateRefreshToken({
      _id: user._id,
      roles: user.role,
      fName: user.firstName,
      lName: user.lastName,
    });

    console.log("UserName: ", user.firstName, user.lastName);
    console.log("AccessToken :", accessToken);
    console.log("RefreshToken :", refreshToken);

    res.send({ token: accessToken, refreshToken: refreshToken });
  } catch (err) {
    return res.status(401).send({ error: "Invalid password" });
  }
};

const adminChangePass = (req, res) => {
  const { email } = req.body;
  res.send(email);
};

module.exports = {
  adminSignUp,
  adminSignIn,
  adminChangePass,
};
