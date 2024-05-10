const ProductModel = require("../models/product.model");

class ProductService {
  constructor() {
    this.dummyData = {
      restaurants: {
        restaurant1: {
          name: "Restaurant One",
          products: ["product1", "product2", "product3"],
        },
        restaurant2: {
          name: "Restaurant Two",
          products: ["product4", "product5", "product6"],
        },
      },
      products: {
        product1: {
          name: "Product One",
          description: "Description of Product One",
          price: 10.99,
        },
        product2: {
          name: "Product Two",
          description: "Description of Product Two",
          price: 15.99,
        },
        product3: {
          name: "Product Three",
          description: "Description of Product Three",
          price: 12.49,
        },
        product4: {
          name: "Product Four",
          description: "Description of Product Four",
          price: 8.99,
        },
        product5: {
          name: "Product Five",
          description: "Description of Product Five",
          price: 20.49,
        },
        product6: {
          name: "Product Six",
          description: "Description of Product Six",
          price: 17.99,
        },
      },
    };
  }
  response = {
    statusCode: 0,
    data: {},
  };
  getAllProducts(restaurantId) {
    const restaurant = this.dummyData.restaurants[restaurantId];
    if (!restaurant) {
      this.response = {
        statusCode: 404,
        data: {
          message: "restaurants not found",
        },
      };
      return this.response;
    }
    const products = restaurant.products.map(
      (productId) => this.dummyData.products[productId]
    );
    this.response = {
      statusCode: 200,
      data: products,
    };

    return this.response;
  }
  getProductsById(restaurantId, productId) {
    const restaurant = this.dummyData.restaurants[restaurantId];
    const product = this.dummyData.products[productId];
    if (!restaurant || !product) {
      this.response = { ...this.response, statusCode: 404 };
      delete this.response.data;
      this.response.data = { message: "Not Found" };
      return this.response;
    }

    if (!restaurant.products.includes(productId)) {
      this.response.statusCode = 404;
      this.response.data = { message: "Product not found in the restaurant" };
      return this.response;
    }
    this.response = {
      statusCode: 200,
      data: product,
    };
    return this.response;
  }
  async createProduct(productInfo) {
    return await ProductModel.create(productInfo);
  }
  updateProduct() {
    return "updated";
  }
  deleteProduct() {
    return "deleted";
  }
}

module.exports = ProductService;
