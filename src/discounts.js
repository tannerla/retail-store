import productTypes from "./product-types";

const EMPLOYEE_RATE = 30;
const AFFILIATE_RATE = 10;
const CUSTOM_RATE = 5;
const HIGH_VALUE_THRESHOLD = 100;
const HIGH_VALUE_AMOUNT = 5;

class Discounts {

  static employee(customer, products) {
    if (customer.isEmployee) {
      return getDiscount([...products.values()], EMPLOYEE_RATE);
    }
    return 0;
  }

  static affiliate(customer, products) {
    if (customer.isAffiliate) {
      return getDiscount([...products.values()], AFFILIATE_RATE);
    }
    return 0;
  }

  static longCustom(customer, products) {
    if (customer.getYearsJoined() >= 2) {
      return getDiscount([...products.values()], CUSTOM_RATE);
    }
    return 0;
  }

  static spendAmount(basket) {
    return (
      Math.floor(basket.getTotal() / HIGH_VALUE_THRESHOLD) *
      HIGH_VALUE_AMOUNT
    );
  }
}

export default Discounts

const getDiscount = (products, rate) => {
  return products.reduce((acc, product) => {
    if (product.productTypes != productTypes.GROCERIES) {
      return (acc = +getPercentAsValue(product.price, rate));
    }
    return acc;
  }, 0);
}

const getPercentAsValue = (val, rate) => {
  return val/100 * rate;
}
