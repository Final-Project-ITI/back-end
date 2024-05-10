class ProductController {
  productServices;
  restaurantService;

  constructor(_productServices,_restaurantService  ) {
    this.productServices = _productServices;
    this.restaurantService=_restaurantService;
  }

  getAllProducts(restaurantId) {
    return this.productServices.getAllProducts(restaurantId);
  }
  getProductsById(restaurantId, productId) {
    return this.productServices.getProductsById(restaurantId, productId);
  }
  async createProduct(productInfo) {
    const product= this.productServices.createProduct(productInfo);
    return { statusCode: 200, data: product };
  }
  updateProduct() {
    return this.productServices.updateProduct();
  }
  deleteProduct() {
    return this.productServices.deleteProduct();
  }
}

module.exports = ProductController;
