'use strict';

const assert = require('chai').assert;
const helpers = require('../lib/helpers');


describe('helpers', function() {
    describe('#optionsToQueryString()', function() {
        context('when generating a query string', function() {
            it('should create qs object', function() {
                var testOptions = {
                    'fields': ['Name', 'Description'],
                    'where': 'Status = 1',
                    'order': ['CreatedDate', 'Name ASC'],
                    'page': 1,
                    'rows': 50
                };

                var assertion = {
                    'fields': 'Name,Description',
                    'where': 'Status = 1',
                    'order': 'CreatedDate,Name ASC',
                    'page': 1,
                    'rows': 50
                };

                var testData = helpers.optionsToQueryString(testOptions);
                assert.deepEqual(testData, assertion);
            });
        });
    });
});
