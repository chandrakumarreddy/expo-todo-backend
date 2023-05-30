import express from "express";
import { createUser, getUser } from "../controllers/user";
import categoryRoutes from "./category";

const router = express.Router();

router.route("/create").post(createUser);
router.route("/login").post(getUser);

router.use(categoryRoutes);

export default router;
