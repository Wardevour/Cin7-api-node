'use strict';

const httpClient = require('node-fetch');

/**
 * Sleep for a bit.
 *
 * @param {integer} ms - The time to sleep in milliseconds.
 * @returns {Promise} Resolves in ms miliseconds.
 */
exports.sleep = function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Wrap the http client and make a request.
 *
 * @param {Object} options - Request settings object.
 * @param {string} [options.headers] - The headers to use for requests.
 * @param {string} options.baseUrl - The base url to use for requests.
 * @param {string} [options.uri] - The resource uri.
 * @param {Object} [searchParams] - Key value pairs used to build a
 *  querystring.
 * @returns {Promise} Resolves on status ok with response, else we reject.
 */
exports.request = function request(options, searchParams) {
    if (typeof searchParams !== 'undefined') {
        searchParams = new URLSearchParams(searchParams);
    } else {
        searchParams = new URLSearchParams();
    }

    let url = new URL(options.uri, options.baseUrl);
    url.search = searchParams;

    let clientOptions = {};
    if (typeof options.headers !== 'undefined') {
        clientOptions.headers = options.headers;
    }

    return httpClient(url.href, clientOptions).then((response) => {
        if (!response.ok) {
            return new Promise((resolve, reject) => {
                reject(new Error(response.statusText));
            });
        }

        return response;
    });
}
