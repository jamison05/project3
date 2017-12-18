require("dotenv").config();

require("../config/mongoose-setup");

const FishItems = require("../models/fishdisplay-model");


const fishList = [
    {
        commonname: 'Cuban cichlid',
        sci_name: 'Nandopsis tetracanthis',
        images:['http://z5.ifrm.com/5900/99/0/p1009542/1.jpg'],
        currentSize: "3",
        maxSize: "11",
        tempermant: "aggressive",
        waterpreference: "normal-hardness",
        locations: [
          'Cuba']
    },
    {
      commonname: 'Cuban cichlid',
      sci_name: 'Nandopsis tetracanthis',
      images:['http://z5.ifrm.com/5900/99/0/p1009542/1.jpg'],
      currentSize: "3",
      maxSize: "11",
      tempermant: "aggressive",
      waterpreference: "normal-hardness",
      locations: [
        'Cuba']
    }
];//Ending bracket


FishItems.create(fishList)
  .then((results) => {
      console.log(`${results.length} fish item created`);
  })
  .catch((err) => {
      console.log("Save ERROR!");
      console.log(err);
  });
