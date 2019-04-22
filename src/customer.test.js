import moment from "moment";
import uuid from "uuid";

import Customer from "./customer";
import Product from "./product";
import productTypes from "./product-types";

describe("testCustomer", () => {
  const dateJoined = moment([2017, 3, 23]);
  const customer = new Customer(true, false, dateJoined);

  it("should be created as Customer", () => {
    expect(customer).toBeDefined();
    expect(customer.dateJoined).toBe(dateJoined);
    expect(customer.isEmployee).toBe(true);
    expect(customer.isAffiliate).toBe(false);
    expect(customer.basket).toBeDefined();
  });

  it("should provide years since joined", () => {
    expect(customer.getYearsJoined()).toBe(1);
  });

  it("should add a product to basket", () => {
    customer.addToBasket(new Product(uuid.v1(), productTypes.GROCERIES, 100));
    expect(customer.basket.products.size).toEqual(1);
  });
});