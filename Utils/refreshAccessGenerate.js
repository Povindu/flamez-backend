const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const AdminModel = require('../Models/Admin.Model')

const { generateAccessToken } = require("./generateAccessToken");


const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log("decoded", decoded);

    if (!decoded) {
      throw new Error("Invalid refresh token");
    }
    if (decoded.roles === "admin") {
      const Admin = await AdminModel.findOne({ _id: decoded._id });
      console.log("Admin", Admin);
      if (!Admin) {
        throw new Error("Invalid refresh token, Cannot find related Admin");
      }
    }

    const accessToken = generateAccessToken({
      _id: decoded._id,
      roles: decoded.roles,
      fName: decoded.fName,
      lName: decoded.lName,
    });

    return { accessToken };
  } catch (err) {
    console.error("Error refreshing access token:", err);
    return null;
  }
};

module.exports = { refreshAccessToken };
