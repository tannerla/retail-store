import uuid from "uuid";
import Basket from "./basket";
import Product from "./product";
import productTypes from "./product-types";

describe("testBasket", () => {
  const basket = new Basket();

  it("should be created as Basket", () => {
    expect(basket).toBeDefined();
    expect(basket.products).toBeDefined();
  });

  it("should add a product and return total", () => {
    basket.addProduct(new Product(uuid.v1(), productTypes.GROCERIES, 100));
    basket.addProduct(new Product(uuid.v1(), productTypes.GROCERIES, 1));
    expect(basket.products.size).toEqual(2);
    expect(basket.getTotal()).toEqual(101);
  });
});