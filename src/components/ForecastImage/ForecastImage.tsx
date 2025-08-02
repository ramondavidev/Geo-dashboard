"use client";

import React from "react";
import { ForecastImageProps } from "./ForecastImage.types";
import {
  ForecastContainer,
  ForecastTitle,
  EmptyState,
} from "./ForecastImage.styles";

export const ForecastImage: React.FC<ForecastImageProps> = ({
  users,
  height = "500px",
  className,
}) => {
  const usersWithWeather = users.filter((user) => user.weather);
  const totalUsers = users.length;
  const usersWithData = usersWithWeather.length;

  return (
    <>
      {usersWithWeather.length === 0 ? (
        <EmptyState>No weather data available for users</EmptyState>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "20px",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative Background Elements */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "100px",
              opacity: 0.1,
              transform: "rotate(-15deg)",
            }}
          >
            🌐
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              fontSize: "80px",
              opacity: 0.1,
              transform: "rotate(15deg)",
            }}
          >
            📍
          </div>

          {/* Main Content */}
          <div
            style={{
              textAlign: "center",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: "80px",
                marginBottom: "0.8rem",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
              }}
            >
              🗺️
            </div>

            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "0.8rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {totalUsers} Location{totalUsers !== 1 ? "s" : ""} Tracked
            </h2>

            <p
              style={{
                fontSize: "1rem",
                opacity: 0.9,
                marginBottom: "1.5rem",
                maxWidth: "400px",
                lineHeight: 1.4,
              }}
            >
              Real-time weather monitoring across {usersWithData} active
              location{usersWithData !== 1 ? "s" : ""} worldwide
            </p>

            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.2)",
                  padding: "0.8rem 1.2rem",
                  borderRadius: "15px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>
                  🌡️
                </div>
                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  Live Weather
                </div>
                <div style={{ opacity: 0.8, fontSize: "0.8rem" }}>
                  Temperature & Conditions
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.2)",
                  padding: "0.8rem 1.2rem",
                  borderRadius: "15px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>
                  🕐
                </div>
                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  Time Zones
                </div>
                <div style={{ opacity: 0.8, fontSize: "0.8rem" }}>
                  Global Time Tracking
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.2)",
                  padding: "0.8rem 1.2rem",
                  borderRadius: "15px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>
                  📊
                </div>
                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  Analytics
                </div>
                <div style={{ opacity: 0.8, fontSize: "0.8rem" }}>
                  Weather Insights
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
