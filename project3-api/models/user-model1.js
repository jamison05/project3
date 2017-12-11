const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
      fullName: {
          type: String,
          required: [true, 'Please tell us your name']
      },
      username: {
          type: String,
          required: [true, 'Username is required']
      },
      encryptedPassword: {
          type: String,
          required: [true, 'Encrypted password is empty']
      }
  },

  {
      timestamps: true
  }
);

const User = mongoose.model("UserFishSite", userSchema);


module.exports = User;
