const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
    refreshToken: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

// Hash the password before saving the user model
Admin.pre("save", function (next) {
  const Admin = this;
  if (!Admin.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(Admin.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      Admin.password = hash;
      next();
    });
  });
});

// Compare the password given with the hashed password in the database
Admin.methods.comparePassword = function (candidatePassword) {
  const Admin = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, Admin.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

module.exports = mongoose.model("Admin", Admin);
