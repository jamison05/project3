const express = require("express");

const Fish = require("../models/fishdisplay-model");


const router = express.Router();


router.get("/displayfish", (req, res, next) => {
    Fish
      .find()
      .limit(25)
      .exec()
      .then((fdisplayResults) => {
          // respond with the QUERY RESULTS in the JSON format
          res.status(200).json(fdisplayResults);
      })
      .catch((err) => {
          console.log("GET /dispalyfish ERROR!");
          console.log(err);

          // respond with an ERROR MESSAGE in the JSON format
          res.status(500).json({ error: "Fish list database error" });
      });
}); // GET /phones


router.post("/displayfish", (req, res, next) => {
    const theFish = new Fish({
        commonname: req.body.commonname,
        sci_name: req.body.sci_name,
        images: req.body.images,
        currentSize: req.body.currentSize,
        masSize: req.body.maxSize,
        tempermant: req.body.tempermant,
        waterpreference: req.body.waterpreference,
        locations: req.body.locations,
    });
    // commonname: 'Cuban cichlids',
    // sci_name: 'Nandopsis tetracanthis',
    // images:['http://z5.ifrm.com/5900/99/0/p1009542/1.jpg'],
    // currentSize: "3",
    // maxSize: "11",
    // tempermant: "aggressive",
    // water-preference: "normal-hardness"
    // locations: [
    //   'Cuba'
    theFish.save()
      .then(() => {
          // respond with the NEW PHONE in the JSON format
          res.status(200).json(thePhone);
      })
      .catch((err) => {
          console.log("Post /Fish ERROR!");
          console.log(err);

          // 400 status code if validation error
          if (err.errors) {
              // respond with an VALIDATION ERRORS in the JSON format
              res.status(400).json(err.errors);
          }
          else {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(500).json({ error: "Phone save database error" });
          }
      });
}); // POST /phones


router.get("/displayfish/:id", (req, res, next) => {
    if (req.user === undefined) {
        res.status(400).json({ error: "Not logged in" });
        return;
    }

    Fish.findById(req.params.id)
      .then((fishFromDb) => {
          // 404 if fish doesn't exist
          if (fishFromDb === null) {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(404).json({ error: "Phone not found" });
          }
          else {
              // respond with the QUERY RESULTS in the JSON format
              res.status(200).json(fishFromDb);
          }
      })
      .catch((err) => {
          console.log("GET /displayfish/:id ERROR!");
          console.log(err);

          // respond with an ERROR MESSAGE in the JSON format
          res.status(500).json({ error: "Fish details database error" });
      });
}); // GET /displayfish/:id


router.delete("/displayfish/:id", (req, res, next) => {
    if (req.user === undefined) {
        res.status(400).json({ error: "Not logged in" });
        return;
    }

    Fish.findByIdAndRemove(req.params.id)
      .then((fishFromDb) => {
          if (fishFromDb === null) {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(404).json({ error: "Fish not found" });
          }
          else {
              // respond with the QUERY RESULTS in the JSON format
              res.status(200).json(fishFromDb);
          }
      })
      .catch((err) => {
          console.log("DELETE /displayfish/:id ERROR!");
          console.log(err);

          // respond with an ERROR MESSAGE in the JSON format
          res.status(500).json({ error: "Fish delete database error" });
      });
}); // DELETE /fishdisplay/:id


router.put("/displayfish/:id", (req, res, next) => {
    Fish.findById(req.params.id)
      .then((fishFromDb) => {
          if (fishFromDb === null) {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(404).json({ error: "Phone not found" });
              return;
          }

          fishFromDb.set({
            commonname: req.body.commonname,
            sci_name: req.body.sci_name,
            images: req.body.images,
            currentSize: req.body.currentSize,
            masSize: req.body.maxSize,
            tempermant: req.body.tempermant,
            waterpreference: req.body.waterpreference,
            locations: req.body.locations,
          });

          return fishFromDb.save();
      })
      .then((fishFromDb) => {
          // respond with the QUERY RESULTS in the JSON format
          res.status(200).json(fishFromDb);
      })
      .catch((err) => {
          console.log("PUT /displayfish/:id ERROR!");
          console.log(err);

          // 400 status code if validation error
          if (err.errors) {
              // respond with an VALIDATION ERRORS in the JSON format
              res.status(400).json(err.errors);
          }
          else {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(500).json({ error: "Fish update database error" });
          }
      });
}); // PUT /displayfish/:id


module.exports = router;
