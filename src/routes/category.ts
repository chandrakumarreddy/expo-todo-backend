import express from "express";
import { authenticateMiddleware } from "../middleware/auth";
import {
  addCategory,
  deleteCategory,
  getAllCategoriesByUser,
} from "../controllers/category";

const router = express.Router();

router.use(authenticateMiddleware);

router.route("/categories").get(getAllCategoriesByUser).post(addCategory);

router.route("/categories/:categoryId").delete(deleteCategory);

export default router;
