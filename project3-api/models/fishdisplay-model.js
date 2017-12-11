const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const itemSchema = new Schema(
  {
      commonname: {
          type: String,
          required: [true, 'Add information on fish.']

      },
      sci_name: {
          type: String,
          required: [true, 'Add information on fish.']
      },
      images: [{
          type: String,
          required: [true, 'Add an image, seeing is believing.']
      }],
      currentSize: {
          type: Number,
          required: [true, 'Add information on fish.']
      },
      maxSize: {
          type: Number,
          required: [false, '']
      },
      tempermant: {
          type: String,
          required: [false, '']
      },
      waterpreference: {
          type: String,
          required: [false, '']
      },
      locations: [{
          type: String,
          required: [true, 'Where are these fish from?']
      }],


  },

  {
      timestamps: true
  }
);
// commonname: 'Cuban cichlids',
// sci_name: 'Nandopsis tetracanthis',
// images:['http://z5.ifrm.com/5900/99/0/p1009542/1.jpg'],
// currentSize: "3",
// maxSize: "11",
// tempermant: "aggressive",
// water-preference: "normal-hardness"
// locations: [
//   'Cuba'
// ]r
const Items = mongoose.model("fishFishSite", itemSchema);


module.exports = Items;
