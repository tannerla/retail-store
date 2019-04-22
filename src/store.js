class Store {
  constructor(customer = null, discounts) {
    this._customer = customer; // has Basket
    this._discounts = discounts;
  }

  checkout() {
    let basket = this._customer.basket;
    let discount = 0;
    let appliedOnePolicy = false;
    let finalTotal;

    // Only One policy
    discount += this._discounts.onlyOne.reduce((acc, algo) => {
      if (!appliedOnePolicy) {
        let result = algo(this._customer, basket.products);
        appliedOnePolicy = result > 0; // discount applied, so dont apply more
        return acc + result;
      }
      return acc;
    }, 0);

    // Every policy
    discount += this._discounts.all.reduce((acc, algo) => {
      return (acc += algo(basket));
    }, 0);

    finalTotal = basket.getTotal() - discount;

    // Report
    console.log(`Basket: ${basket.getTotal()}`);
    console.log(`Discount: ${discount}`);
    console.log(`Final: ${finalTotal}`);

    return finalTotal;
  }
}

export default Store;
