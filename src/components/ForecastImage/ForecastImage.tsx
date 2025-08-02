"use client";

import React from "react";
import { WeatherAvatar } from "../WeatherAvatar";
import { ForecastImageProps } from "./ForecastImage.types";
import {
  ForecastContainer,
  ForecastTitle,
  WeatherGrid,
  WeatherCard,
  UserInfo,
  UserName,
  LocationText,
  WeatherInfo,
  EmptyState,
} from "./ForecastImage.styles";
import { getWeatherCondition } from "./ForecastImage.utils";

export const ForecastImage: React.FC<ForecastImageProps> = ({
  users,
  height = "500px",
  className,
}) => {
  // Only show users with weather data
  const usersWithWeather = users.filter((user) => user.weather);

  return (
    <ForecastContainer $height={height} className={className}>
      <ForecastTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌤️ Global Weather Forecast
      </ForecastTitle>

      {usersWithWeather.length === 0 ? (
        <EmptyState>No weather data available for users</EmptyState>
      ) : (
        <WeatherGrid>
          {usersWithWeather.map((user, index) => (
            <WeatherCard
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
              }}
            >
              <WeatherAvatar
                userName={user.name}
                weather={
                  user.weather
                    ? {
                        ...user.weather,
                        condition: getWeatherCondition(
                          user.weather.description
                        ) as
                          | "sunny"
                          | "cloudy"
                          | "rainy"
                          | "snowy"
                          | "stormy"
                          | "foggy",
                      }
                    : undefined
                }
                size="lg"
              />
              <UserInfo>
                <UserName>{user.name}</UserName>
                <LocationText>
                  📍 {user.zipCode} • {user.latitude.toFixed(2)}°,{" "}
                  {user.longitude.toFixed(2)}°
                </LocationText>
                {user.weather && (
                  <WeatherInfo>
                    🌡️ {Math.round(user.weather.temp)}°F •{" "}
                    {user.weather.description}
                    <br />
                    💧 {user.weather.humidity}% humidity • 💨{" "}
                    {user.weather.windSpeed} mph
                  </WeatherInfo>
                )}
              </UserInfo>
            </WeatherCard>
          ))}
        </WeatherGrid>
      )}
    </ForecastContainer>
  );
};
