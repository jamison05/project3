const express = require("express");

const router = express.Router();
const User = require('../models/user-model');
const FishCommerce = require("../models/fish-sales-model");
const transCommerce = require("../models/transaction-sales-model");
const Fish = require("../models/fishdisplay-model");

router.get("/displayfish/:id/commerce", (req, res, next) => {
    // if (req.user === undefined) {
    //     res.status(400).json({ error: "Not logged in" });
    //     return;
    // }


    //you wil have to automatically send the fishname to to the
    //database.
    Fish.findOne({ fishname: req.body.commonname })
    .then((fishFromDb) => {
      var nameFromDb = fishFromDb.commonname;
      FishCommerce.findOne({ nameFromDb: req.body.fish })
      .then((commerceFromDb) => {
          // 404 if fish doesn't exist
          if (commerceFromDb === null) {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(404).json({ error: "Commerce for fish not found" });
              console.log(fishFromDb);
          }
          else {

              res.status(200).json(commerceFromDb);
          }
      })
      .catch((err) => {
          console.log("GET /displayfish/:id commerce fish");
          console.log(err);

          // respond with an ERROR MESSAGE in the JSON format
          res.status(500).json({ error: "Fish details database error" });
      });
    }); // GET commerce of specific fish
});

router.get("/displaytransaction", (req, res, next) => {
    Fish
      .find()
      .limit(25)
      .exec()
      .then((fdisplayResults) => {
          // respond with the QUERY RESULTS in the JSON format
          res.status(200).json(fdisplayResults);
      })
      .catch((err) => {
          console.log("GET /display trans ERROR!");
          console.log(err);

          // respond with an ERROR MESSAGE in the JSON format
          res.status(500).json({ error: "Fish list database error" });
      });
}); // GET /fish

//Will access the databas for transcactions. Only if the user //commits
//to buying the item.
router.post("/displayfish/transaction", (req, res, next) => {
    const newTransaction = new transCommerce({

        username: req.body.username,
        number_ofItems: req.body.number_ofItems,
        cost_per_item:req.body.cost_per_item,
        fish_sales_item: req.body.fish_sales_item,

    });
      newTransaction.save().then(() => {
        res.status(200).json(newTransaction);
        }).catch((err) => {
          console.log("POST /trascaction ERROR!");
          console.log(err);
          console.log(newTransaction);
          // 400 status code if validation error
          if (err.errors) {
              // respond with an VALIDATION ERRORS in the JSON format
              res.status(400).json(err.errors);
          }
          else {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(500).json({ error: "Tranaction save database error" });
          }
      });
}); // POST new commerce item.


module.exports = router;
