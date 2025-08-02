import express from "express";
import { UserController } from "../controllers/userController";
import {
  validateCreateUser,
  validateUpdateUser,
} from "../middleware/validation";

const router = express.Router();
const userController = new UserController();

// GET /api/users - Get all users
router.get("/", userController.getAllUsers.bind(userController));

// GET /api/users/:id - Get user by ID
router.get("/:id", userController.getUserById.bind(userController));

// POST /api/users - Create new user
router.post(
  "/",
  validateCreateUser,
  userController.createUser.bind(userController)
);

// PUT /api/users/:id - Update user
router.put(
  "/:id",
  validateUpdateUser,
  userController.updateUser.bind(userController)
);

// DELETE /api/users/:id - Delete user
router.delete("/:id", userController.deleteUser.bind(userController));

export default router;
