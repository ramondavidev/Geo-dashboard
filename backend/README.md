# Geo-CRUD Backend

A modern Node.js/Express backend with TypeScript, Firebase Realtime Database, and OpenWeatherMap API integration.

## Features

- 🚀 **Express.js** with TypeScript
- 🔥 **Firebase Realtime Database** for data storage
- 🌍 **OpenWeatherMap API** integration for geo-location data
- 🛡️ **Security** with Helmet and CORS
- 📝 **Request logging** with Morgan
- ✅ **Input validation** and error handling
- 🔄 **Auto-restart** with Nodemon

## API Endpoints

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/health`        | Health check    |
| GET    | `/api/users`     | Get all users   |
| GET    | `/api/users/:id` | Get user by ID  |
| POST   | `/api/users`     | Create new user |
| PUT    | `/api/users/:id` | Update user     |
| DELETE | `/api/users/:id` | Delete user     |

## Data Model

```typescript
interface User {
  id: string;
  name: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}
```

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Environment setup:**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your configuration:

   - `OPENWEATHER_API_KEY`: Get from [OpenWeatherMap](https://openweathermap.org/api)
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_DATABASE_URL`: Your Firebase Realtime Database URL

3. **Firebase setup:**

   - Create a Firebase project
   - Enable Realtime Database
   - Download service account key and set `GOOGLE_APPLICATION_CREDENTIALS` path
   - Or use Firebase Admin SDK with default credentials

4. **Development:**

   ```bash
   npm run dev
   ```

5. **Production:**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript type definitions
│   └── server.ts        # Main server file
├── dist/                # Compiled JavaScript (generated)
└── package.json
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "data": [] // Optional validation errors
}
```

## Validation

Input validation is performed for:

- **Name**: 2-100 characters, letters, spaces, hyphens, apostrophes
- **Zip Code**: US format (12345 or 12345-6789)

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Clean build directory
- `npm run build:clean` - Clean and build
