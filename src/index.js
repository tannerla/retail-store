import moment from "moment";
import uuid from "uuid";
import Customer from "./customer";
import Product from "./product";
import productTypes from "./product-types";
import Discounts from "./discounts";
import Store from "./store";

// Establish customer
const customer = new Customer(true, false, moment.now());

// Establish discounts (ordered)
const discounts = {
  onlyOne: [Discounts.employee, Discounts.affiliate, Discounts.longCustom],
  all: [Discounts.spendAmount]
};

// Init store and checkout
const store = new Store(customer, discounts);

// Add products to basket
customer.addToBasket(new Product(uuid.v1(), productTypes.GROCERIES, 1));
customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 1));

// Checkout
store.checkout();
