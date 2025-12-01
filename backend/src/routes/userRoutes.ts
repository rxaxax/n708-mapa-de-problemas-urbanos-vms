import { Router } from "express";
import * as userController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { checkAdmin } from "../middlewares/checkAdmin";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.patch(
  "/:id/role",
  authMiddleware,
  checkAdmin,
  userController.updateUserRole
);

export default router;
