import moment from "moment";
import Basket from "./basket";

class Customer {
  constructor(isEmployee = false, isAffiliate = false, dateJoined = moment()) {
    this._isEmployee = isEmployee;
    this._isAffiliate = isAffiliate;
    this._dateJoined = dateJoined;
    this._basket = new Basket();
  }

  get isEmployee() {
    return this._isEmployee;
  }

  get isAffiliate() {
    return this._isAffiliate;
  }

  get dateJoined() {
    return this._dateJoined;
  }

  get basket() {
    return this._basket;
  }

  addToBasket(product) {
    this._basket.addProduct(product);
  }

  getYearsJoined() {
    return moment().diff(moment(this._dateJoined), "years");
  }
}

export default Customer;
