'use strict';

const fs = require('fs');
const path = require('path');
const sleep = require('../lib/helpers').sleep;
const Cin7 = require('../index');

let cin7 = new Cin7();

const fetch = function fetch() {
    let rows = [];
    let options = {
        'fields': ['id', 'status', 'name', 'description'],
        'rows': 50,
        'page': 1
    };

    let recursive = () => {
        return cin7.products.get(options).then((response) => {
            return response.json();
        }).then((data) => {
            rows = rows.concat(data);
            if (data.length >= 50) {
                options.page++;
                // Calls are limited to 1 per second, 60 per minute
                //   and 5000 per day. If you exceed this rate limit you
                //   will receive a HTTP 429 (Too Many Requests) response.
                return sleep(1000).then(recursive);
            } else {
                return new Promise((resolve, reject) => {
                    resolve(rows);
                });
            }
        });
    };

    return recursive();
};

fetch().then((data) => {
    let rows = [];
    rows[0] = Object.keys(data[0]).join(',');

    for (let i = 1; i < data.length; i++) {
        let values = Object.values(data[i]);

        // wrap values in single quotes
        values = values.map((val) => {
            return "'" + val + "'";
        });

        rows[i] = values.join(',');
    }

    // write the csv file
    let fileName = 'output' + path.sep + 'all-products.csv';
    fs.writeFileSync(fileName, rows.join('\n'), 'utf-8');
    console.log('Saved products to "' + fileName + '"');
}).catch((err) => {
    console.log(err);
});
