"use strict";

const Cin7 = require("../index");
const assert = require("chai").assert;

var cin7 = null;


describe("Cin7.products", function() {
    before(function() {
        cin7 = new Cin7();
    });

    describe("#get()", function() {
        context("when using default options", function() {
            it("should create products.json", function(done) {
                this.timeout(3000);

                cin7.products.get().then(() => {
                    done();
                }).catch(done);
            });
        });
    });
});
