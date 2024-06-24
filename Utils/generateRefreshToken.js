const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin.Model");

const generateRefreshToken = async (payload) => {
  // console.log("payload", payload);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  const updatedUser = await Admin.findOneAndUpdate(
    { _id: payload._id },
    { refreshToken: refreshToken },
    { new: true }
  );

  return refreshToken;
};

module.exports = { generateRefreshToken };
