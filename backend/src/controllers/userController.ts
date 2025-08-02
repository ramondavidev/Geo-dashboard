import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { ApiResponse, CreateUserRequest, UpdateUserRequest } from "../types";

export class UserController {
  private userService = new UserService();

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();

      const response: ApiResponse = {
        success: true,
        data: users,
        message: `Found ${users.length} users`,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch users",
      };

      res.status(500).json(response);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        const response: ApiResponse = {
          success: false,
          error: "User ID is required",
        };
        res.status(400).json(response);
        return;
      }

      const user = await this.userService.getUserById(id);

      if (!user) {
        const response: ApiResponse = {
          success: false,
          error: "User not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: user,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch user",
      };

      res.status(500).json(response);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserRequest = req.body;

      const user = await this.userService.createUser(userData);

      const response: ApiResponse = {
        success: true,
        data: user,
        message: "User created successfully",
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create user",
      };

      // Return 400 for validation errors, 500 for other errors
      const statusCode =
        error instanceof Error &&
        (error.message.includes("required") ||
          error.message.includes("Invalid") ||
          error.message.includes("must be"))
          ? 400
          : 500;

      res.status(statusCode).json(response);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData: UpdateUserRequest = req.body;

      if (!id) {
        const response: ApiResponse = {
          success: false,
          error: "User ID is required",
        };
        res.status(400).json(response);
        return;
      }

      const user = await this.userService.updateUser(id, userData);

      const response: ApiResponse = {
        success: true,
        data: user,
        message: "User updated successfully",
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update user",
      };

      // Return appropriate status codes
      let statusCode = 500;
      if (error instanceof Error) {
        if (error.message === "User not found") {
          statusCode = 404;
        } else if (
          error.message.includes("required") ||
          error.message.includes("Invalid") ||
          error.message.includes("must be")
        ) {
          statusCode = 400;
        }
      }

      res.status(statusCode).json(response);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        const response: ApiResponse = {
          success: false,
          error: "User ID is required",
        };
        res.status(400).json(response);
        return;
      }

      await this.userService.deleteUser(id);

      const response: ApiResponse = {
        success: true,
        message: "User deleted successfully",
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete user",
      };

      // Return 404 for user not found, 500 for other errors
      const statusCode =
        error instanceof Error && error.message === "User not found"
          ? 404
          : 500;

      res.status(statusCode).json(response);
    }
  }
}
