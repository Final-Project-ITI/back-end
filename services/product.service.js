const ApiError = require("../utils/error");
const ProductModel = require("../models/product.model");

class ProductService {
  constructor() {}
  products = [
    {
      id: "1",
      title: "Margherita Pizza",
      icon: "pizza-icon.png",
      menuCategory: "Pizza",
      ingredientsIDs: ["123", "124"],
      restaurantID: "456",
    },
    {
      id: "2",
      title: "Caesar Salad",
      icon: "salad-icon.png",
      menuCategory: "Salad",
      ingredientsIDs: ["125", "126", "127"],
      restaurantID: "457",
    },
    {
      id: "3",
      title: "Spaghetti Bolognese",
      icon: "spaghetti-icon.png",
      menuCategory: "Pasta",
      ingredientsIDs: ["128", "129", "130"],
      restaurantID: "458",
    },
    {
      id: "4",
      title: "Chicken Tikka Masala",
      icon: "curry-icon.png",
      menuCategory: "Curry",
      ingredientsIDs: ["131", "132", "133"],
      restaurantID: "459",
    },
    {
      id: "5",
      title: "Sushi Platter",
      icon: "sushi-icon.png",
      menuCategory: "Sushi",
      ingredientsIDs: ["134", "135", "136"],
      restaurantID: "460",
    },
    {
      id: "6",
      title: "Cheeseburger",
      icon: "burger-icon.png",
      menuCategory: "Burgers",
      ingredientsIDs: ["137", "138", "139"],
      restaurantID: "461",
    },
    {
      id: "7",
      title: "Fish and Chips",
      icon: "fish-icon.png",
      menuCategory: "Seafood",
      ingredientsIDs: ["140", "141", "142"],
      restaurantID: "462",
    },
    {
      id: "8",
      title: "Mushroom Risotto",
      icon: "risotto-icon.png",
      menuCategory: "Risotto",
      ingredientsIDs: ["143", "144", "145"],
      restaurantID: "463",
    },
    {
      id: "9",
      title: "Steak Frites",
      icon: "steak-icon.png",
      menuCategory: "Steak",
      ingredientsIDs: ["146", "147", "148"],
      restaurantID: "464",
    },
    {
      id: "10",
      title: "Tiramisu",
      icon: "tiramisu-icon.png",
      menuCategory: "Dessert",
      ingredientsIDs: ["149", "150", "151"],
      restaurantID: "465",
    },
  ];

  async getAllProducts(restaurantId) {
    try {
      const products = await ProductModel.find({ restaurantID: restaurantId });
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new ApiError("Error fetching products", 500);
    }
  }

  async getProductsById(restaurantId, productId) {
    try {
      const product = await ProductModel.findOne({
        _id: productId,
        restaurantID: restaurantId,
      });
      return product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new ApiError("Error fetching product by ID", 500);
    }
  }

  async createProduct(productInfo) {
    return await ProductModel.create(productInfo);
  }

  async updateProduct(productId, updatedProductData) {
    const productCount = this.products.length;
    const index = this.products.findIndex(
      (product) => product.id === productId
    );

    if (index !== -1 || productId < productCount) {
      this.products[index] = { ...this.products[index], ...updatedProductData };
      return this.products[index];
    }

    throw new ApiError("Product not found or update failed", 400);
  }

  async deleteProduct(productId) {
    const index = await this.products.findIndex(
      (product) => product.id === productId
    );
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    throw new ApiError("Product not found or deleted failed", 400);
  }
}

module.exports = ProductService;
