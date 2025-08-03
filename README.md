# 🌍 Geo-Location CRUD Dashboard

A modern full-stack geo-location application that seamlessly manages user data with automatic location and weather information. Perfect for applications requiring user management with geographic context, real-time weather data, and timezone-aware functionality.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-EB6E4B?style=for-the-badge&logo=openweathermap&logoColor=white)

## ✨ Features

- **👥 Complete User Management**: Full CRUD operations for user data with intuitive interface
- **🌍 Automatic Geo-Location**: Fetch latitude, longitude, and timezone data using OpenWeatherMap API
- **🌤️ Real-Time Weather**: Beautiful weather forecast visualization with animated weather cards
- **🕐 Timezone Awareness**: Smart timezone detection and display for user locations
- **🔥 Real-Time Updates**: Firebase Realtime Database integration for instant data synchronization
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **🎨 Modern UI/UX**: Styled Components with Framer Motion animations for smooth interactions
- **⚡ Performance Optimized**: Fast loading with efficient data fetching and caching
- **🛡️ Secure Backend**: Helmet security headers and CORS protection
- **🔧 Robust Error Handling**: Comprehensive error management with user-friendly messages
- **🧪 Test Coverage**: Jest and React Testing Library for reliable code quality

## 🛠 Tech Stack

### Frontend (Next.js)

- **Framework**: [Next.js 15](https://nextjs.org/) with TypeScript and App Router
- **Styling**: [Styled Components](https://styled-components.com/) for CSS-in-JS styling
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth, performant animations
- **State Management**: React hooks and context for efficient state handling
- **Testing**: [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/react)
- **Maps & Weather**: Custom forecast components with weather visualization
- **TypeScript**: Full type safety throughout the application

### Backend (Node.js/Express)

- **Runtime**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type-safe backend development
- **Database**: [Firebase Realtime Database](https://firebase.google.com/products/realtime-database) for real-time data synchronization
- **External APIs**: [OpenWeatherMap API](https://openweathermap.org/api) for geo-location and weather data
- **Security**: [Helmet](https://helmetjs.github.io/) for security headers, CORS for cross-origin requests
- **Logging**: [Morgan](https://github.com/expressjs/morgan) for HTTP request logging
- **Validation**: Custom middleware for request/response validation

### Infrastructure & Services

- **Real-time Database**: Firebase for instant data updates
- **Weather Data**: OpenWeatherMap API integration
- **Error Handling**: Comprehensive error management across all layers
- **Environment Management**: Secure configuration with environment variables

## 🚀 Getting Started

### Prerequisites

Before running the application, make sure you have the following:

- **Node.js** 16+ and **npm** (for both frontend and backend)
- **Firebase Project** with Realtime Database ([Firebase Console](https://console.firebase.google.com/))
- **OpenWeatherMap API Key** ([Get one here](https://openweathermap.org/api))

### 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ramondavidev/geo-crud.git
   cd geo-crud
   ```

2. **Frontend Setup**

   Install dependencies:

   ```bash
   npm install
   ```

3. **Backend Setup**

   Navigate to backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

4. **Environment Configuration**

   **Frontend Environment** - Create `.env.local` in the root directory:

   ```env
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
   ```

   **Backend Environment** - Create `.env` in the `backend` directory:

   ```env
   FIREBASE_API_KEY=""
   FIREBASE_AUTH_DOMAIN=""
   FIREBASE_DATABASE_URL=""
   FIREBASE_PROJECT_ID=""
   FIREBASE_STORAGE_BUCKET=""
   FRONTEND_URL=""
   OPENWEATHER_API_KEY=""
   NODE_ENV=""
   FIREBASE_CLIENT_EMAIL=""
   FIREBASE_PRIVATE_KEY=""
   ```

   > ⚠️ **Important**: Replace the placeholder values with your actual API keys and Firebase configuration

5. **Firebase Setup**

   If needed, follow the detailed instructions in `backend/FIREBASE_SETUP.md` and `backend/SERVICE_ACCOUNT_SETUP.md` to configure Firebase authentication and database rules.

### 🏃‍♂️ Running the Application

#### Manual Setup

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   ✅ Backend will be available at: http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```
   ✅ Frontend will be available at: http://localhost:3000

### 🔧 Development Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode

# Backend
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run test         # Run backend tests
```

## 🎯 How to Use

1. **👤 User Management**

   - **Create Users**: Add new users with basic information (name, email, zip code)
   - **Auto Geo-Location**: System automatically fetches latitude, longitude, and timezone based on zip code
   - **Real-Time Updates**: Changes are instantly synchronized across all connected clients

2. **🌍 Geographic Features**

   - **Location Detection**: Automatic coordinate and timezone fetching via OpenWeatherMap API
   - **Weather Integration**: Visual weather forecast for user locations
   - **Timezone Display**: Smart timezone-aware clocks for each user location

3. **📊 Weather Dashboard**

   - **Forecast Visualization**: Beautiful weather cards with animations
   - **Location-Based Weather**: Weather data specific to each user's geographic location
   - **Real-Time Updates**: Weather information updates automatically

4. **🔄 Real-Time Synchronization**

   - **Live Updates**: Changes appear instantly across all connected devices
   - **Conflict Resolution**: Firebase handles concurrent updates seamlessly
   - **Offline Support**: Basic offline functionality with sync when reconnected

## 🔌 API Endpoints

### User Management

| Method   | Endpoint         | Description                          | Request Body      | Response        |
| -------- | ---------------- | ------------------------------------ | ----------------- | --------------- |
| `GET`    | `/api/users`     | Get all users                        | -                 | Users array     |
| `GET`    | `/api/users/:id` | Get user by ID                       | -                 | User object     |
| `POST`   | `/api/users`     | Create new user (with geo-location)  | User data         | Created user    |
| `PUT`    | `/api/users/:id` | Update user (re-fetch geo if needed) | Updated user data | Updated user    |
| `DELETE` | `/api/users/:id` | Delete user                          | -                 | Success message |

## 📁 Project Structure

```
geo-crud/
├── 📁 src/                          # Frontend source code
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Main dashboard page
│   │   ├── globals.css              # Global styles
│   │   └── StyledComponentsRegistry.tsx # Styled Components setup
│   ├── 📁 components/               # React components
│   │   ├── 📁 common/               # Reusable UI components
│   │   │   ├── Button/              # Button component with variants
│   │   │   └── Input/               # Form input components
│   │   ├── 📁 EarthIcon/            # Earth icon with animations
│   │   ├── 📁 ForecastImage/        # Weather forecast visualization
│   │   ├── 📁 Layout/               # Application layout wrapper
│   │   ├── 📁 Modal/                # Modal dialog component
│   │   ├── 📁 TimeZoneClock/        # Timezone-aware clock display
│   │   ├── 📁 UserManagement/       # User CRUD interface
│   │   ├── 📁 WeatherAvatar/        # User weather avatar
│   │   └── 📁 WeatherOverview/      # Weather dashboard overview
│   ├── 📁 config/                   # Configuration files
│   │   └── firebase.ts              # Firebase client configuration
│   ├── 📁 services/                 # API and external services
│   │   ├── apiService.ts            # Backend API integration
│   │   └── weatherService.ts        # Weather data service
│   ├── 📁 styles/                   # Styling configuration
│   │   ├── GlobalStyle.ts           # Global styled-components
│   │   ├── theme.ts                 # Theme configuration
│   │   └── styled.d.ts              # TypeScript styled-components types
│   └── 📁 types/                    # TypeScript type definitions
├── 📁 backend/                      # Backend API
│   ├── 📁 src/                      # Backend source code
│   │   ├── server.ts                # Express server setup
│   │   ├── 📁 config/               # Configuration files
│   │   │   └── firebase.ts          # Firebase admin SDK setup
│   │   ├── 📁 controllers/          # Route controllers
│   │   │   └── userController.ts    # User CRUD operations
│   │   ├── 📁 middleware/           # Express middleware
│   │   │   ├── errorHandler.ts      # Error handling middleware
│   │   │   └── validation.ts        # Request validation
│   │   ├── 📁 routes/               # API route definitions
│   │   │   └── userRoutes.ts        # User API routes
│   │   ├── 📁 services/             # Business logic services
│   │   │   ├── geoLocationService.ts # OpenWeatherMap integration
│   │   │   └── userService.ts       # User business logic
│   │   └── 📁 types/                # Backend type definitions
│   ├── package.json                 # Backend dependencies
│   └── tsconfig.json                # Backend TypeScript config
├── 📁 public/                       # Static assets
│   ├── earth.png                    # Earth imagery
│   └── *.svg                        # Icon assets
├── package.json                     # Frontend dependencies and scripts
├── next.config.js                   # Next.js configuration
├── jest.config.js                   # Jest testing configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## 🧪 Testing

The application includes comprehensive testing with Jest and React Testing Library:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Test Coverage Includes:**

- Component rendering and interactions
- API service integration
- Weather data processing
- Timezone calculations
- Form validation and error handling

## 🔒 Security Considerations

- **API Keys**: Never expose API keys in client-side code
- **Firebase Rules**: Configure proper database security rules
- **CORS**: Backend configured for secure cross-origin requests
- **Input Validation**: All user inputs are validated and sanitized
- **Error Messages**: Sensitive information is not exposed in error responses

---

<div align="center">

**Made with ❤️ by [Ramon Davi](https://github.com/ramondavidev)**

⭐ **Star this repo if you found it helpful!** ⭐

</div>
