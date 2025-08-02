# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a modern full-stack geo-location CRUD application with the following stack:

### Frontend (Next.js)

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Styled Components for CSS-in-JS
- **Animations**: Framer Motion for smooth animations
- **Maps**: Cool forecast image component for weather visualization
- **Testing**: Jest with React Testing Library
- **State Management**: React hooks and context

### Backend (Node.js/Express)

- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: Firebase Realtime Database
- **External APIs**: OpenWeatherMap API for geo-location data
- **Security**: Helmet for security headers, CORS for cross-origin requests
- **Logging**: Morgan for HTTP request logging

## Key Features

1. **CRUD Operations**: Create, Read, Update, Delete users
2. **Geo-location**: Automatic lat/lng/timezone fetching via OpenWeatherMap API
3. **Weather Forecast**: Cool visual weather forecast showing user locations with animated weather cards
4. **Modern UI**: Responsive design with smooth animations
5. **Real-time Updates**: Firebase Realtime Database integration

## Development Guidelines

- Use TypeScript for all new code
- Follow modern React patterns (hooks, functional components)
- Implement proper error handling and loading states
- Write tests for critical functionality
- Use semantic HTML and accessible design patterns
- Implement proper API error handling and validation
- Follow RESTful API conventions for backend endpoints

## API Endpoints Structure

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user (with geo-location fetching)
- `PUT /api/users/:id` - Update user (re-fetch geo data if zip changes)
- `DELETE /api/users/:id` - Delete user

## Environment Variables

- `OPENWEATHER_API_KEY` - OpenWeatherMap API key
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_DATABASE_URL` - Firebase Realtime Database URL
