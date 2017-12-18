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
      email: {
          type: String,
          required: [true, 'Email is required so that we can contact you about order.']
      },
      encryptedPassword: {
          type: String,
          required: [true, 'Encrypted password is empty']
      },
      role: {
    type: String,
    // role can only be "normal" or "admin"
    enum: ["normal", "admin"],
    default: "normal"
  },
  address: {
    type: String
    }


  },



  {
      timestamps: true
  }
);

const User = mongoose.model("UserFishSite", userSchema);


module.exports = User;
