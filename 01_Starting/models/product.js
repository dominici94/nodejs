const products = [];

module.exports = class Product {
  constructor(tit) {
    this.title = tit;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
};
