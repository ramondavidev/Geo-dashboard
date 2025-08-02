// Example of how to modify the existing validation.ts to support international postal codes

import { validatePostalCode } from "../utils/postalCodeValidation";

// In your existing validation middleware, replace the zipCode validation with:

export function validateUserWithCountry(data: any) {
  const { name, email, zipCode, countryCode = "US" } = data;
  const errors: { field: string; message: string }[] = [];

  // Validate name
  if (!name) {
    errors.push({ field: "name", message: "Name is required" });
  } else if (typeof name !== "string") {
    errors.push({ field: "name", message: "Name must be a string" });
  } else if (name.trim().length < 2) {
    errors.push({
      field: "name",
      message: "Name must be at least 2 characters",
    });
  }

  // Validate email
  if (!email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (typeof email !== "string") {
    errors.push({ field: "email", message: "Email must be a string" });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push({ field: "email", message: "Invalid email format" });
    }
  }

  // Validate countryCode
  if (countryCode && typeof countryCode !== "string") {
    errors.push({
      field: "countryCode",
      message: "Country code must be a string",
    });
  } else if (countryCode && countryCode.length !== 2) {
    errors.push({
      field: "countryCode",
      message: "Country code must be 2 characters (ISO 3166-1 alpha-2)",
    });
  }

  // Validate postal code with international support
  if (!zipCode) {
    errors.push({ field: "zipCode", message: "Postal code is required" });
  } else if (typeof zipCode !== "string") {
    errors.push({ field: "zipCode", message: "Postal code must be a string" });
  } else {
    const validation = validatePostalCode(zipCode, countryCode);
    if (!validation.isValid) {
      errors.push({
        field: "zipCode",
        message: validation.message || "Invalid postal code format",
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Example API endpoint that would accept country code:
/*
POST /api/users
{
  "name": "Carlos Silva",
  "email": "carlos@example.com", 
  "zipCode": "01310-100",
  "countryCode": "BR"
}
*/
