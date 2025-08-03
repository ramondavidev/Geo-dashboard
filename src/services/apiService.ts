import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ApiResponse,
} from "@/types";

interface ValidationError {
  field: string;
  message: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Validation failed" && Array.isArray(data.data)) {
          const validationErrors = data.data
            .map((err: ValidationError) => err.message)
            .join(". ");
          throw new Error(validationErrors);
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error instanceof Error ? error : new Error("Unknown API error");
    }
  }

  async getAllUsers(): Promise<User[]> {
    const response = await this.request<User[]>("/api/users");
    return response.data || [];
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.request<User>(`/api/users/${id}`);
    if (!response.data) {
      throw new Error("User not found");
    }
    return response.data;
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await this.request<User>("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!response.data) {
      throw new Error("Failed to create user");
    }
    return response.data;
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await this.request<User>(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (!response.data) {
      throw new Error("Failed to update user");
    }
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.request(`/api/users/${id}`, {
      method: "DELETE",
    });
  }

  async checkHealth(): Promise<{
    status: string;
    timestamp: string;
    uptime: number;
  }> {
    const response = await this.request<{
      status: string;
      timestamp: string;
      uptime: number;
    }>("/health");
    if (!response.data) {
      throw new Error("Health check failed");
    }
    return response.data;
  }
}

export const apiService = new ApiService();
