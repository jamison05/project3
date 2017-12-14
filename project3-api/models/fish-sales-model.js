const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const saleSchema = new Schema(
  {
      cost: {
          type: Number,
          required: [true, 'Please set a price.']
      },
      availability: {
          type: String,
          required: [false, 'Give avaiaibility']
      },
      captiveBreeding: {
          type: Boolean,
          required: [false, 'Can the fish breed in captivity?']
      },
      fish: {
      type:  String,
      required: [true, "Fish"]
      }


  },

  {
      timestamps: true
  }
);

const sale_model = mongoose.model("saleFishSite", saleSchema);


module.exports = sale_model;
