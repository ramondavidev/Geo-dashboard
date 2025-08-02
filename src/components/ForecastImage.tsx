"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { User } from "@/types";
import { WeatherAvatar } from "./WeatherAvatar";

interface ForecastImageProps {
  users: User[];
  height?: string;
  className?: string;
}

const ForecastContainer = styled.div<{ $height: string }>`
  width: 100%;
  height: ${({ $height }) => $height};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ForecastTitle = styled(motion.h2)`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
`;

const WeatherCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const LocationText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

const WeatherInfo = styled.div`
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.85rem;
  line-height: 1.4;
`;

const EmptyState = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  text-align: center;
  padding: 2rem;
`;

const getWeatherCondition = (description: string): string => {
  const desc = description.toLowerCase();
  if (desc.includes("rain") || desc.includes("drizzle")) return "rainy";
  if (desc.includes("snow") || desc.includes("sleet")) return "snowy";
  if (desc.includes("storm") || desc.includes("thunder")) return "stormy";
  if (desc.includes("cloud") || desc.includes("overcast")) return "cloudy";
  if (desc.includes("fog") || desc.includes("mist")) return "foggy";
  return "sunny";
};

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
