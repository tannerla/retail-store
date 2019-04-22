import uuid from 'uuid';

class Product {
  constructor(sku = uuid.v1(), productType = "", price = 0) {
    this._sku = sku;
    this._productType = productType;
    this._price = price;
  }

  get sku() {
    return this._sku;
  }

  get productType() {
    return this._productType;
  }

  get price() {
    return this._price;
  }
}

export default Product;
