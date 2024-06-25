const express = require("express");
const router = express.Router();

const categoryRouter = (
  categoryController,
  authMiddleware,
  multerMiddleware
) => {
  router.get(
    "/",
    authMiddleware.anyUser(categoryController.authRepository),
    async (req, res, next) => {
      try {
        const categories = await categoryController.getCategories();
        res.status(200).send(categories);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:categoryId",
    authMiddleware.anyUser(categoryController.authRepository),
    async (req, res, next) => {
      try {
        const category = await categoryController.getCategoryById(
          req.params.categoryId
        );
        res.status(200).send(category);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/",
    authMiddleware.admin(categoryController.authRepository),
    multerMiddleware.uploadSingleImage("icon"),
    async (req, res, next) => {
      try {
        const newCategory = await categoryController.createCategory(
          req.body.title,
          req.body.description,
          req.file
        );
        res.status(200).send(newCategory);
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    "/:categoryId",
    authMiddleware.admin(categoryController.authRepository),
    multerMiddleware.uploadSingleImage("icon"),
    async (req, res, next) => {
      try {
        const updatedCategory = await categoryController.updateCategoryById(
          req.params.categoryId,
          req.body,
          req.file
        );
        res.status(200).send(updatedCategory);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:categoryId",
    authMiddleware.admin(categoryController.authRepository),
    async (req, res, next) => {
      try {
        const deletedCategory = await categoryController.deleteCategory(
          req.params.categoryId
        );
        res.status(200).send(deletedCategory);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

module.exports = categoryRouter;
