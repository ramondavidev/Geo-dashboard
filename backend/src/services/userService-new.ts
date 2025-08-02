import { getFirebaseDatabase } from "../config/firebase";
import { User, CreateUserRequest, UpdateUserRequest } from "../types";
import { GeoLocationService } from "./geoLocationService";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  private readonly geoService = new GeoLocationService();

  private getDatabase() {
    const database = getFirebaseDatabase();
    if (!database) {
      throw new Error(
        "Firebase database not available. Please configure Firebase credentials."
      );
    }
    return database;
  }

  private getUsersRef() {
    return this.getDatabase().ref("users");
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const database = getFirebaseDatabase();
      if (!database) {
        // Return mock data when Firebase is not configured
        console.log("🔸 Returning mock users data");
        return [
          {
            id: "1",
            name: "John Doe",
            zipCode: "10001",
            latitude: 40.7128,
            longitude: -74.006,
            timezone: "America/New_York",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Jane Smith",
            zipCode: "90210",
            latitude: 34.0522,
            longitude: -118.2437,
            timezone: "America/Los_Angeles",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
      }

      const snapshot = await this.getUsersRef().once("value");
      const users = snapshot.val();

      if (!users) {
        return [];
      }

      // Convert object to array and sort by creation date
      return Object.values(users as Record<string, User>).sort(
        (a: User, b: User) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const database = getFirebaseDatabase();
      if (!database) {
        // Return mock data when Firebase is not configured
        console.log(`🔸 Returning mock user data for ID: ${id}`);
        return {
          id,
          name: "Mock User",
          zipCode: "12345",
          latitude: 40.7128,
          longitude: -74.006,
          timezone: "America/New_York",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      const snapshot = await this.getUsersRef().child(id).once("value");
      const user = snapshot.val();

      return user || null;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const userId = uuidv4();
      const now = new Date().toISOString();

      // Get location data based on zip code
      const geoData = await this.geoService.getLocationDataByZipCode(
        userData.zipCode
      );

      const newUser: User = {
        id: userId,
        name: userData.name,
        zipCode: userData.zipCode,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        timezone: geoData.timezone,
        createdAt: now,
        updatedAt: now,
      };

      const database = getFirebaseDatabase();
      if (!database) {
        // Mock mode - just return the user
        console.log("🔸 Created mock user:", newUser);
        return newUser;
      }

      // Save to Firebase
      await this.getUsersRef().child(userId).set(newUser);

      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    try {
      // Get existing user
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        throw new Error("User not found");
      }

      // Prepare updated user data
      const updatedUser: User = {
        ...existingUser,
        ...userData,
      };

      // If zip code changed, update location data
      if (userData.zipCode && userData.zipCode !== existingUser.zipCode) {
        const geoData = await this.geoService.getLocationDataByZipCode(
          userData.zipCode
        );
        updatedUser.latitude = geoData.latitude;
        updatedUser.longitude = geoData.longitude;
        updatedUser.timezone = geoData.timezone;
      }

      // Update timestamp
      updatedUser.updatedAt = new Date().toISOString();

      const database = getFirebaseDatabase();
      if (!database) {
        // Mock mode - just return the updated user
        console.log("🔸 Updated mock user:", updatedUser);
        return updatedUser;
      }

      // Save to Firebase
      await this.getUsersRef().child(id).set(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      if (error instanceof Error) {
        throw error; // Re-throw known errors
      }
      throw new Error("Failed to update user");
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      // Check if user exists
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        throw new Error("User not found");
      }

      const database = getFirebaseDatabase();
      if (!database) {
        // Mock mode - just log the deletion
        console.log(`🔸 Deleted mock user with ID: ${id}`);
        return;
      }

      // Delete from Firebase
      await this.getUsersRef().child(id).remove();
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error instanceof Error) {
        throw error; // Re-throw known errors
      }
      throw new Error("Failed to delete user");
    }
  }

  async getUsersByZipCode(zipCode: string): Promise<User[]> {
    try {
      const allUsers = await this.getAllUsers();
      return allUsers.filter((user) => user.zipCode === zipCode);
    } catch (error) {
      console.error("Error fetching users by zip code:", error);
      throw new Error("Failed to fetch users by zip code");
    }
  }

  async getUsersNearLocation(
    latitude: number,
    longitude: number,
    radiusKm = 50
  ): Promise<User[]> {
    try {
      const allUsers = await this.getAllUsers();

      // Simple distance calculation (for demo purposes)
      // In production, you'd want to use a proper geospatial query
      return allUsers.filter((user) => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          user.latitude,
          user.longitude
        );
        return distance <= radiusKm;
      });
    } catch (error) {
      console.error("Error fetching users near location:", error);
      throw new Error("Failed to fetch users near location");
    }
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
