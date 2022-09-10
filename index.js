const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const countriesRouter = require("./routes/countries");
const salesrepRouter = require("./routes/salesrep");
const optimalRouter = require("./routes/optimal");

mongoose.connect(`mongodb://${process.env.UNM}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}?authSource=admin`,
e => {
    if(e)
    {
        console.log(e);
    }else
    {
        console.log("Connected successfully to database");
    }
});

app.use("/countries", countriesRouter);
app.use("/salesrep", salesrepRouter);
app.use("/optimal", optimalRouter);

app.listen(3000,  () => {
    console.log("Server is running on port 300");
});

