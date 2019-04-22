class Basket {
  constructor() {
    this._products = new Map();
  }

  get products() {
    return this._products;
  }

  addProduct(product) {
    if (product) {
      this._products.set(product.sku, product);
    }
  }

  getTotal() {
    return [...this._products.values()].reduce((acc, product) => {
      return acc + product.price;
    }, 0);

    // Note: Alternative
    // let total = 0;
    // for (let [key, val] of this._products) {
    //   total += val.price;
    // }
    // return total;
  }
}

export default Basket;
