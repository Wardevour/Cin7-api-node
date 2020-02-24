'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const sleep = require('../lib/helpers').sleep;
const Cin7 = require('../index');

var cin7 = null;


describe('Cin7.products', function() {
    before(function() {
        cin7 = new Cin7();
    });

    describe('#get()', function() {
        context('when using default options', function() {
            it('should create output/products.json', function(done) {
                this.timeout(5000);

                cin7.products.get().then((response) => {
                    return response.text();
                }).then((text) => {
                  // make a file system agnostic file name
                  var fileName = 'output' + path.sep + 'products.json';

                  // this throws an error if the path doesn't exist
                  //   or the file couldn't be created
                  fs.writeFileSync(fileName, text, 'utf-8');

                  done();
                }).catch(done);
            });

            it('should create output/products.csv', function(done) {
                this.timeout(5000);

                cin7.products.get().then((response) => {
                    return response.json();
                }).then((data) => {
                    var rows = [];
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
                    var fileName = 'output' + path.sep + 'products.csv';
                    fs.writeFileSync(fileName, rows.join('\n'), 'utf-8');

                    done();
                }).catch(done);
            });
        });

        context('when using page options', function() {
            it('should get two pages and concat them', function(done) {
                this.timeout(6000);

                var rows = [];

                var options = {
                    'fields': ['id'],
                    'rows': 1,
                    'order': ['id ASC'],
                    'page': 1
                };

                cin7.products.get(options).then((response) => {
                    return response.json();
                }).then((data) => {
                    rows = rows.concat(data);

                    // Calls are limited to 1 per second, 60 per minute
                    //   and 5000 per day. If you exceed this rate limit you
                    //   will receive a HTTP 429 (Too Many Requests) response.
                    return sleep(1000);
                }).then(() => {
                    options.page++;
                    return cin7.products.get(options);
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    rows = rows.concat(data);

                    assert.isAbove(rows.length, 1);
                    assert.isAbove(rows[1].id, rows[0].id);
                    done();
                }).catch(done);
            });
        });
    });
});
