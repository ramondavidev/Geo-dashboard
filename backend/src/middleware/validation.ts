import { Request, Response, NextFunction } from "express";
import { ApiResponse, ValidationError } from "../types";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors: ValidationError[] = [];
  const { name, zipCode } = req.body;

  // Validate name
  if (!name) {
    errors.push({ field: "name", message: "Name is required" });
  } else if (typeof name !== "string") {
    errors.push({ field: "name", message: "Name must be a string" });
  } else {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      errors.push({
        field: "name",
        message: "Name must be at least 2 characters long",
      });
    } else if (trimmedName.length > 100) {
      errors.push({
        field: "name",
        message: "Name must be less than 100 characters long",
      });
    } else {
      const nameRegex = /^[a-zA-Z\s\-']+$/;
      if (!nameRegex.test(trimmedName)) {
        errors.push({
          field: "name",
          message:
            "Name can only contain letters, spaces, hyphens, and apostrophes",
        });
      }
    }
  }

  // Validate zipCode
  if (!zipCode) {
    errors.push({ field: "zipCode", message: "Zip code is required" });
  } else if (typeof zipCode !== "string") {
    errors.push({ field: "zipCode", message: "Zip code must be a string" });
  } else {
    const trimmedZipCode = zipCode.trim();
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(trimmedZipCode)) {
      errors.push({
        field: "zipCode",
        message: "Zip code must be in format 12345 or 12345-6789",
      });
    }
  }

  if (errors.length > 0) {
    const response: ApiResponse = {
      success: false,
      error: "Validation failed",
      data: errors,
    };
    res.status(400).json(response);
    return;
  }

  next();
};

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors: ValidationError[] = [];
  const { name, zipCode } = req.body;

  // Check if at least one field is provided
  if (name === undefined && zipCode === undefined) {
    const response: ApiResponse = {
      success: false,
      error: "At least one field (name or zipCode) must be provided for update",
    };
    res.status(400).json(response);
    return;
  }

  // Validate name if provided
  if (name !== undefined) {
    if (typeof name !== "string") {
      errors.push({ field: "name", message: "Name must be a string" });
    } else {
      const trimmedName = name.trim();
      if (trimmedName.length < 2) {
        errors.push({
          field: "name",
          message: "Name must be at least 2 characters long",
        });
      } else if (trimmedName.length > 100) {
        errors.push({
          field: "name",
          message: "Name must be less than 100 characters long",
        });
      } else {
        const nameRegex = /^[a-zA-Z\s\-']+$/;
        if (!nameRegex.test(trimmedName)) {
          errors.push({
            field: "name",
            message:
              "Name can only contain letters, spaces, hyphens, and apostrophes",
          });
        }
      }
    }
  }

  // Validate zipCode if provided
  if (zipCode !== undefined) {
    if (typeof zipCode !== "string") {
      errors.push({ field: "zipCode", message: "Zip code must be a string" });
    } else {
      const trimmedZipCode = zipCode.trim();
      const zipRegex = /^\d{5}(-\d{4})?$/;
      if (!zipRegex.test(trimmedZipCode)) {
        errors.push({
          field: "zipCode",
          message: "Zip code must be in format 12345 or 12345-6789",
        });
      }
    }
  }

  if (errors.length > 0) {
    const response: ApiResponse = {
      success: false,
      error: "Validation failed",
      data: errors,
    };
    res.status(400).json(response);
    return;
  }

  next();
};
