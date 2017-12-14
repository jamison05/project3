require("dotenv").config();

require("../config/mongoose-setup");

const fishBuyItems = require("../models/fish-sales-model");


const fishBuyList = [
    {
    cost:8.99,
    availability:"more",
    captiveBreeding:true,
    fish:'Cuban cichlids'
    },
    {
    cost:8.99,
    availability:"more",
    captiveBreeding:true,
    fish:'Cuban cichlid'
    },

];//Ending bracket

// cost: {
//     type: Number,
//     required: [true, 'Please set a price.']
// },
// availability: {
//     type: String,
//     required: [false, 'Give avaiaibility']
// },
// captiveBreeding: {
//     type: Boolean,
//     required: [false, 'Can the fish breed in captivity?']
// },
// fish: {
// type:  String,
// required: [true, "Fish"]
// }
//
//
// },

fishBuyItems.create(fishBuyList)
  .then((results) => {
      console.log(`${results.length} fish item created`);
  })
  .catch((err) => {
      console.log("Save ERROR!");
      console.log(err);
  });
