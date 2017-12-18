const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transcSchema = new Schema(
  {
    username: {
    type: String,
    // required:[true, "User should be connected with this transaction."]
    },

    number_ofItems:{
    type: Number,
    // required:[true, "Number error."]
    },

    //Will obtain objects from the fish sales model for the
    //transcactions.
    cost_per_item: {
    type: Number,
    // required:[true, "Fish item can't connect with this transaction."]
    },
    fish_sales_item: {
    type: Schema.Types.ObjectId,
    // required:[true, "Fish item can't connect with this transaction."]
    },

  },

  {
    timestamps: true
  }
);

const transcItems = mongoose.model("FishTranscation2", transcSchema);


module.exports = transcItems;
