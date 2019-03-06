"use strict";

// allow setting environment variables with a .env file
require("dotenv").config();

// prepare needed data for making requests
const API_KEY = Buffer.from(process.env.API_KEY).toString("base64");
const baseUrl = "https://api.cin7.com/api/v1";
const products = require("./lib/products");


module.exports = class Cin7 {
    constructor() {
        this.options = {
            "url": baseUrl,
            "headers": {
                "Authorization": "Basic " + API_KEY
            }
        };

        this.products = products;

        this.products.init(this.options);
    }
}
