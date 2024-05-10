class ProductService {
  constructor() {}

  getAllProducts() {
    return "All Products For The Website Owner";
  }
  getUserProductsById() {
    return "Products For The User";
  }
  createProduct() {
    return "created";
  }
  updateProduct() {
    return "updated";
  }
  deleteProduct() {
    return "deleted";
  }
}

module.exports = ProductService;
