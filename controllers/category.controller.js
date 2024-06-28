const Errors = require("../error/error");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");

class CategoryController {
  categoryRepository;
  authRepository;

  constructor(_categoryRepository, _authRepository) {
    this.categoryRepository = _categoryRepository;
    this.authRepository = _authRepository;
  }

  async getCategories() {
    return await this.categoryRepository.getCategories();
  }

  async getCategoryRestaurantsById(categoryId) {
    return await this.categoryRepository.getCategoryRestaurnatsById(categoryId);
  }

  async createCategory(title, description, icon) {
    const categories = await this.categoryRepository.getCategories();
    const isCategoryExist = categories.find(
      (category) => title === category.title
    );

    if (isCategoryExist) {
      throw new Errors.ApiError("Category already exists", 400);
    }

    // Upload category icon
    const storage = getStorage();

    const iconSnapshot = await uploadBytesResumable(
      ref(storage, `categories/${uuidv4()}`),
      icon.buffer,
      { contentType: icon.mimetype }
    );

    const newCategory = await this.categoryRepository.createCategory({
      title,
      description,
      icon: await getDownloadURL(iconSnapshot.ref),
    });

    return newCategory;
  }

  async updateCategoryById(categoryId, val, icon) {
    const category = await this.categoryRepository.getCategoryById(categoryId);

    if (!category) {
      throw new Errors.NotFoundError("Category not found");
    }

    if (icon) {
      const storage = getStorage();

      const iconSnapshot = await uploadBytesResumable(
        ref(storage, `categories/${uuidv4()}`),
        icon.buffer,
        { contentType: icon.mimetype }
      );

      val.icon = await getDownloadURL(iconSnapshot.ref);
    }

    await this.categoryRepository.updateCategoryById(categoryId, val);

    return val;
  }

  async deleteCategory(categoryId) {
    const category = await this.categoryRepository.getCategoryById(categoryId);

    if (!category) {
      throw new Errors.NotFoundError("Category not found");
    }

    return await this.categoryRepository.deleteCategory(categoryId);
  }
}

module.exports = CategoryController;
