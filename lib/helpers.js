"use strict";

/**
 * Build Request qs options containing Cin7's supported GET parameters
 *
 * @param {Object} options - Settings object.
 * @param {string[]} [options.fields] - Record fields to return.
 * @param {string} [options.where] - Where statement to filter the records.
 * @param {string[]} [options.order] - Fields to order the returned records. To
 *   reverse, append "ASC" to the end of a field.
 * @param {integer} [options.page] - The page number of the record list. If
 *   there are 50 records in the response, you will need to check if there is
 *   any more data by fetching the next page and continuing this process until
 *   no more results are returned.
 * @param {integer} [options.rows] - How many records to respond with
 */
exports.optionsToQueryString = function optionsToQueryString(options) {
    var qs = {};

    if (typeof options.fields !== "undefined" &&
        Array.isArray(options.fields)) {
        qs.fields = options.fields.join(',');
    }

    if (typeof options.where !== "undefined") {
        qs.where = options.where;
    }

    if (typeof options.order !== "undefined" &&
        Array.isArray(options.order)) {
        qs.order = options.order.join(',');
    }

    if (typeof options.page === "number") {
        qs.page = options.page;
    }

    if (typeof options.rows === "number") {
        qs.rows = options.rows;
    }

    return qs;
};
