"use strict";

if (process.env.NODE_ENV != "production") {
    // allow setting environment variables with a .env file when developing
    require("dotenv").config();
}

// prepare needed data for making requests
const CIN7_API_KEY = Buffer.from(process.env.CIN7_API_KEY).toString("base64");
const baseUrl = "https://api.cin7.com/api/v1";
const products = require("./lib/products");


module.exports = class Cin7 {
    constructor() {
        this.options = {
            "baseUrl": baseUrl,
            "headers": {
                "Authorization": "Basic " + CIN7_API_KEY
            }
        };

        this.products = products;

        this.products.init(this.options);
    }
}
