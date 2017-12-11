const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
      cost: {
          type: Number,
          required: [true, 'Please set a price.']
      },
      availability: {
          type: Number,
          required: [false, '']
      },
      ranking: {
          type: String,
          required: [false, '']
      },
      captiveBreeding: {
          type: Boolean,
          required: [false, 'Encrypted password is empty']
      }
  },

  {
      timestamps: true
  }
);

const User = mongoose.model("UserFishSite", userSchema);


module.exports = User;
