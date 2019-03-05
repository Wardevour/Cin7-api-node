// allow setting environment variables with a .env file
require("dotenv").config();

// get required libs
const fs = require("fs");
const path = require("path");
const util = require("util");
const request = util.promisify(require("request"));

// prepare needed data for making requests
const API_KEY = Buffer.from(process.env.API_KEY).toString("base64");
const baseUrl = "https://api.cin7.com/api/v1";

var options = {
	"url": baseUrl + "/Products",
	"headers": {
		"Authorization": "Basic " + API_KEY
	}
};

// make a Products request and save the response body to a json file
request(options).then((response) => {
	// make a file system agnostic file name
	var fileName = "output" + path.sep + "products.json";

	// this synchronous call makes the next line wait, but that's ok here
	fs.writeFileSync(fileName, response.body, "utf-8");
	console.log("wrote all data to file");
}).catch((err) => {
	console.log(err.message);
});
