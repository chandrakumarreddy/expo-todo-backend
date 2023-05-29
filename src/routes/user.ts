import express from "express";
import { createUser, getUser } from "../controllers/user";

const router = express.Router();

router.route("/create").post(createUser);
router.route("/login").post(getUser);

export default router;
