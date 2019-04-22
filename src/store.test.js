import moment from "moment";
import uuid from "uuid";
import Customer from "./customer";
import Basket from "./basket";
import Product from "./product";
import productTypes from "./product-types";
import Discounts from "./discounts";
import Store from "./store";

describe("testStore", () => {
  // Establish discounts
  const discounts = {
    onlyOne: [Discounts.employee, Discounts.affiliate, Discounts.longCustom],
    all: [Discounts.spendAmount]
  };

  describe("testProductTypes", () => {
    it("should discount ONLY against products that are NOT groceries", () => {
      const customer = new Customer(false, false, moment([2000, 0, 1]));
      const store = new Store(customer, discounts);
      customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 1));
      customer.addToBasket(new Product(uuid.v1(), productTypes.GROCERIES, 1));
      expect(store.checkout()).toEqual(1.95);
    });
  });

  describe("testOnlyOneDiscounts", () => {
    describe("testAgainstSingleDiscounts", () => {
      it("should NOT discount if customer is not an employee/affiliate, been a customer for under 2 years, amount is under 100", () => {
        const customer = new Customer(false, false, moment.now());
        const store = new Store(customer, discounts);
        customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 1));
        expect(store.checkout()).toEqual(1);
      });

      it("should discount if customer is ONLY an employee", () => {
        const customer = new Customer(true, false, moment.now());
        const store = new Store(customer, discounts);
        customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 1));
        expect(store.checkout()).toEqual(0.7);
      });

      it("should discount if customer is ONLY an affiliate", () => {
        const customer = new Customer(false, true, moment.now());
        const store = new Store(customer, discounts);
        customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 1));
        expect(store.checkout()).toEqual(0.9);
      });

      it("should discount if customer is ONLY been a customer GT 2years", () => {
        const customer = new Customer(false, false, moment([2000, 0, 1]));
        const store = new Store(customer, discounts);
        customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 1));
        expect(store.checkout()).toEqual(0.95);
      });
    });

    describe("testMultipleDiscountsTogether", () => {
      it("should discount against ONLY ONE percentage based discount when all criteria are met (employee)", () => {
        const customer = new Customer(true, true, moment([2000, 0, 1]));
        const store = new Store(customer, discounts);
        customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 1));
        expect(store.checkout()).toEqual(0.7);
      });

      it("should discount against the NEXT met criteria when first criteria is not met (affiliate)", () => {
        const customer = new Customer(false, true, moment([2000, 0, 1]));
        const store = new Store(customer, discounts);
        customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 1));
        expect(store.checkout()).toEqual(0.9);
      });
    });
  });

  describe("testAllDiscounts", () => {
    it("should NOT discount when the amount is UNDER 100", () => {
      const customer = new Customer(false, false, moment.now());
      const store = new Store(customer, discounts);
      customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 1));
      expect(store.checkout()).toEqual(1);
    });

    it("should APPLY discount when the amount is OVER 100", () => {
      const customer = new Customer(false, false, moment.now());
      const store = new Store(customer, discounts);
      customer.addToBasket(new Product(uuid.v1(), productTypes.OTHER, 100));
      expect(store.checkout()).toEqual(95);
    });
  });
});
