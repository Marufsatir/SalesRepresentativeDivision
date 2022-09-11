const express = require("express");
const country = require("../models/country");

const router = express.Router();

// get all countries endpoint
router.get("", (req, res) =>
{
    country.find({}, {name:1, region:1, '_id':0})
    .then((ct) => {res.json(ct)})
    .catch((err) => {res.json(err)});
});

//get the countries in specified region
router.get("/:region", async (req, res) =>
{
    // this is used for if there is a given region in database
    // fetch the regions case insensitive since there was two 
    // region named Apac and APAC and also helpful for request
    var countries = country.findOne({region: { $regex : new RegExp('^'+ req.params.region + '$', "i")}}, {name:1, region:1, '_id':0});

    if((await countries.count()) === 0)
    {
        res.status(409).json("There is no region in database with given name");
    }else
    {
        country.find({region:{ $regex : new RegExp('^'+ req.params.region + '$', "i")}}, {name:1, region:1, '_id':0}).then((ct) => {res.json(ct)}).catch((err) => {res.json(err)});
    }
});

module.exports = router;