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
      commonname: 'Zebra pike cichlid',
      sci_name: 'Crenicichla zebrina',
      images:['https://s-media-cache-ak0.pinimg.com/originals/89/0a/54/890a54b4a71441ebdbbd2f1f71a6b501.jpg'],
      currentSize: "10",
      maxSize: "12",
      tempermant: "aggressive",
      waterpreference: "sof-water",
      locations: [
        'Brazil', 'Columbia']
    },
    {
      commonname: 'Green Terror cichlid',
      sci_name: ' Andinoacara rivulatus',
      images:['https://www.cichlids.com/p/450x600/b5/3c/b53c992fc501d016d0f6c70eae1fdbe5.jpg'],
      currentSize: "2",
      maxSize: "12",
      tempermant: "aggressive",
      waterpreference: "sof-water",
      locations: [
        'All over South America']
    }
];
//Ending bracket
//

//https://www.cichlids.com/uploads/tx_usercichlids/user_pics/10887/imag06_526e9dd74f.jpg



FishItems.create(fishList)
  .then((results) => {
      console.log(`${results.length} fish item created`);
  })
  .catch((err) => {
      console.log("Save ERROR!");
      console.log(err);
  });
