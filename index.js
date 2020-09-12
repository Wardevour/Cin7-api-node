'use strict';

if (process.env.NODE_ENV != 'production') {
    // allow setting environment variables with a .env file when developing
    require('dotenv').config();
}

// format the api key to base64
const CIN7_API_KEY = Buffer.from(process.env.CIN7_API_KEY).toString('base64');
const CIN7_BASE_URL = 'https://api.cin7.com/api/v1/';
const Adjustments = require('./lib/classes/adjustments');
const BomMasters = require('./lib/classes/bom-masters');
const BranchTransfers = require('./lib/classes/branch-transfers');
const Branches = require('./lib/classes/branches');
const Contacts = require('./lib/classes/contacts');
const CreditNotes = require('./lib/classes/credit-notes');
const Payments = require('./lib/classes/payments');
const ProductCategories = require('./lib/classes/product-categories');
const ProductOptions = require('./lib/classes/product-options');
const ProductionJobs = require('./lib/classes/production-jobs');
const Products = require('./lib/classes/products');
const PurchaseOrders = require('./lib/classes/purchase-orders');
const Quotes = require('./lib/classes/quotes');
const SalesOrders = require('./lib/classes/sales-orders');
const SerialNumbers = require('./lib/classes/serial-numbers');
const Stock = require('./lib/classes/stock');
const Users = require('./lib/classes/users');
const Voucher = require('./lib/classes/voucher');

module.exports = class Cin7 {
    /**
     * Initilize Cin7 client.
     */
    constructor() {
        this.options = {
            'baseUrl': CIN7_BASE_URL,
            'headers': {
                'Authorization': 'Basic ' + CIN7_API_KEY
            }
        };

        this.adjustments = new Adjustments(this.options);
        this.bomMasters = new BomMasters(this.options);
        this.branchTransfers = new BranchTransfers(this.options);
        this.branches = new Branches(this.options);
        this.contacts = new Contacts(this.options);
        this.creditNotes = new CreditNotes(this.options);
        this.payments = new Payments(this.options);
        this.productCategories = new ProductCategories(this.options);
        this.productOptions = new ProductOptions(this.options);
        this.productionJobs = new ProductionJobs(this.options);
        this.products = new Products(this.options);
        this.purchaseOrders = new PurchaseOrders(this.options);
        this.quotes = new Quotes(this.options);
        this.salesOrders = new SalesOrders(this.options);
        this.serialNumbers = new SerialNumbers(this.options);
        this.stock = new Stock(this.options);
        this.users = new Users(this.options);
        this.voucher = new Voucher(this.options);
    }
}
