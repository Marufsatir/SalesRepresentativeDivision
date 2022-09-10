const express = require("express");
const request = require("request");

const router = express.Router();

// request options from internal api
const requestOptions = {
    url: 'http://127.0.0.1:3000/countries',
    method: 'GET',
    json: {}
};

router.get("", (req, res) =>
{
    request(requestOptions, (err, response, body) =>
    {
        if(err)
        {
            console.log("Failed to fetch countries");
            res.json(err);
        }else
        {
            let regionCount = {};

            //count the number of countries in regions
            for(let countryReg in body)
            {
                if(body[countryReg]['region'] in regionCount)
                {
                    regionCount[body[countryReg]['region']] = regionCount[body[countryReg]['region']] + 1;
                }else
                {
                    regionCount[body[countryReg]["region"]] = 1;
                }
            }

            let regionMinMaxRep = [];

            // find max and min sales representative for given region
            // by the number of countries in region
            for(let [key, value] of Object.entries(regionCount))
            {
                let min = Math.floor(value / 7);
                if(value < 7)
                {
                    min = 1;
                }else if(min % 7 !== 0)
                {
                    min += 1;
                }
                
                let max = Math.floor(value / 3);
                if(value <= 3)
                {
                    max = 1;
                }

                let el = {};
                el.region = key;
                el.minSalesReq = min;
                el.maxSalesReq = max;

                regionMinMaxRep.push(el);
            }

            res.json(regionMinMaxRep);
        }
    })
});

module.exports = router;