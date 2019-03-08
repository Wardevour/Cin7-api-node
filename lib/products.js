"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");
const request = util.promisify(require("request"));

var requestOptions = {};


exports.init = function init(options) {
    requestOptions = options;
    requestOptions.url += "/Products"
};

/**
 * Make a Products request and save the response body to a json file
 */
exports.get = function get() {
    return new Promise((resolve, reject) => {
        request(requestOptions).then((response) => {
            // make a file system agnostic file name
            var fileName = "output" + path.sep + "products.json";

            // this synchronous call makes the next line wait, but that's ok here
            fs.writeFileSync(fileName, response.body, "utf-8");
            console.log("wrote all data to file");

            resolve(response);
        }).catch((err) => {
            console.log(err.message);

            reject(err);
        });
    });
}
