"use strict";

const fs = require("fs");
const path = require("path");
const Cin7 = require("../index");

var cin7 = null;


describe("Cin7.products", function() {
    before(function() {
        cin7 = new Cin7();
    });

    describe("#get()", function() {
        context("when using default options", function() {
            it("should create output/products.json", function(done) {
                this.timeout(5000);

                cin7.products.get().then((response) => {
                    // make a file system agnostic file name
                    var fileName = "output" + path.sep + "products.json";

                    // this throws an error if the path doesn't exist
                    //   or the file couldn't be created
                    fs.writeFileSync(fileName, response.body, "utf-8");

                    done();
                }).catch(done);
            });
        });
    });
});
