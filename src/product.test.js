import uuid from "uuid";
import Product from "./product";
import productTypes from "./product-types";

describe("testProduct", () => {
  const sku = uuid.v1();
  const product = new Product(sku, productTypes.GROCERIES, 100);

  it("should be created as Product", () => {
    expect(product).toBeDefined();
    expect(product.sku).toBe(sku);
    expect(product.productType).toBe(productTypes.GROCERIES);
    expect(product.price).toBe(100);
  });
});
