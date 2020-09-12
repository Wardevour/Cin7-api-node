'use strict';

const request = require('../helpers').request;

module.exports = class SalesOrders {
    /**
     * Initilize this with some options.
     *
     * @param {Object} options - Request settings object.
     * @param {string} [options.headers] - The headers to use for requests.
     * @param {string} options.baseUrl - The base url to use for requests.
     */
    constructor(options) {
        this.options = options;
        this.options.uri = 'SalesOrders';
    }

    /**
     * Make a GET request for a list of SalesOrders.
     *
     * @param {Object} [searchParams] - k-v pairs for search params.
     * @param {string[]} [searchParams.fields] - Record fields to return.
     * @param {string} [searchParams.where] - Where statement to filter the
     *  records.
     * @param {string[]} [searchParams.order] - Fields to order the returned
     *  records. To reverse, append 'ASC' to the end of a field.
     * @param {integer} [searchParams.page] - The page number of the record
     *  list. If there are 50 records in the response, you will need to check
     *  if there is any more data by fetching the next page and continuing this
     *  process until no more results are returned.
     * @param {integer} [searchParams.rows] - How many records to respond with
     * @returns {Promise} Resolves on status ok with response, else we reject.
     */
    get(searchParams) {
        return request(this.options, searchParams);
    }
}
