'use strict';

const fetch = require('node-fetch');
const getQs = require('./helpers').optionsToQueryString;

var defaultOptions = {};

/**
 * Initilize this with default request options
 *
 * @param {Object} options - Request settings object.
 * @param {string[]} [options.baseUrl] - The base url to use for this' requests.
 * @param {string} [options.headers] - Headers to use for this' requests.
 */
exports.init = function init(options) {
    if (typeof options.baseUrl !== 'undefined') {
        defaultOptions.baseUrl = options.baseUrl;
    }

    if (typeof options.headers !== 'undefined') {
        defaultOptions.headers = options.headers;
    }

    defaultOptions.uri = 'Products';
};

/**
 * Get a Products response
 *
 * @param {Object} options - Settings object.
 * @param {string[]} [options.fields] - Record fields to return.
 * @param {string} [options.where] - Where statement to filter the records.
 * @param {string[]} [options.order] - Fields to order the returned records. To
 *   reverse, append 'ASC' to the end of a field.
 * @param {integer} [options.page] - The page number of the record list. If
 *   there are 50 records in the response, you will need to check if there is
 *   any more data by fetching the next page and continuing this process until
 *   no more results are returned.
 * @param {integer} [options.rows] - How many records to respond with
 * @returns {Promise}
 */
exports.get = function get(options) {
    var requestOptions = Object.assign(defaultOptions);

    var url = new URL(requestOptions.uri, requestOptions.baseUrl);

    if (typeof options !== 'undefined') {
        url.search = new URLSearchParams(getQs(options));
    }

    return fetch(url.href, requestOptions).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    });
}
