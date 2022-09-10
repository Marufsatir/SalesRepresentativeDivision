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
            var regionCount = new Map();

            // maps countries to regions
            for(let countryReg in body)
            {
                let region = body[countryReg]['region'];
                let country = body[countryReg]['name'];
                let added = [];
                if(regionCount.has(region))
                {
                    added = regionCount.get(region);
                }
                added.push(country);
                regionCount.set(region, added);
            }

            var representativesAssigned = [];
            
            // iterate through regions for independently assign
            // salesperson since they must only serve in one region
            regionCount.forEach((value, key) =>
            {
                let countryCount = value.length;
                let countries = value;

                let min = Math.floor(countryCount / 7);
                if(countryCount < 7)
                {
                    min = 1;
                }else if(min % 7 !== 0)
                {
                    min += 1;
                }
                
                // first salesperson shares the countrycount same
                let countRepresentativeWeight = new Array(min).fill(Math.floor(countryCount / min));
                let leftCountry = countryCount % min;


                let index = 0;
                // the countries that is not assigned assigns
                // one by one
                while(leftCountry > 0)
                {
                    countRepresentativeWeight[index]++;
                    index++;
                    leftCountry--;
                }

                let countryIndex = 0;
                // process of assigning actual countries to salesperson 
                for(const countryNumberToAssign of countRepresentativeWeight)
                {
                    let representativeCountries = {};
                    representativeCountries.region = key;
                    
                    let takeCountriesCount = countryNumberToAssign;
                    representativeCountries.countryList = [];
    
                    while(takeCountriesCount > 0)
                    {
                        representativeCountries.countryList.push(countries[countryIndex]);
                        countryIndex++;
                        takeCountriesCount--;
                    }
    
                    representativeCountries.countryCount = countryNumberToAssign;
                    representativesAssigned.push(representativeCountries);
                }

            });
            
            res.json(representativesAssigned);
        }
    })
});

module.exports = router;