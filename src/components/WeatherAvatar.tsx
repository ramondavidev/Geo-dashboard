"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { WeatherData } from "@/types";

interface WeatherAvatarProps {
  userName: string;
  weather?: WeatherData;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "40px",
  md: "60px",
  lg: "80px",
};

const rainAnimation = keyframes`
  0% { transform: translateY(-100%) rotate(10deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(200%) rotate(10deg); opacity: 0; }
`;

const snowAnimation = keyframes`
  0% { transform: translateY(-100%) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(200%) rotate(360deg); opacity: 0; }
`;

const cloudFloat = keyframes`
  0%, 100% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
`;

const sunGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 193, 7, 0.6); }
  50% { box-shadow: 0 0 30px rgba(255, 193, 7, 0.9); }
`;

const AvatarContainer = styled.div<{ $size: string }>`
  position: relative;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: ${({ $size }) => {
    const sizeNum = parseInt($size);
    return `${Math.max(12, sizeNum * 0.3)}px`;
  }};
`;

const WeatherOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
`;

const RainDrop = styled.div<{ $delay: number }>`
  position: absolute;
  width: 2px;
  height: 8px;
  background: linear-gradient(
    to bottom,
    rgba(173, 216, 230, 0.8),
    rgba(135, 206, 235, 0.9)
  );
  border-radius: 1px;
  animation: ${rainAnimation} 1s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const SnowFlake = styled.div<{ $delay: number; $size: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: white;
  border-radius: 50%;
  animation: ${snowAnimation} 2s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  opacity: 0.8;
`;

const CloudOverlay = styled.div`
  position: absolute;
  top: -10%;
  left: -20%;
  right: -20%;
  bottom: -10%;
  background: linear-gradient(
    45deg,
    rgba(211, 211, 211, 0.3),
    rgba(169, 169, 169, 0.3)
  );
  border-radius: 50%;
  animation: ${cloudFloat} 3s ease-in-out infinite;
`;

const SunnyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #ffd700, #ffb300);
  animation: ${sunGlow} 2s ease-in-out infinite;
`;

const CloudyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #778899, #696969);
`;

const RainyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #4682b4, #2f4f4f);
`;

const SnowyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #e6e6fa, #b0c4de);
`;

const StormyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #2f2f2f, #4b0082);
`;

const FoggyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #d3d3d3, #a9a9a9);
`;

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const createRainDrops = () => {
  return Array.from({ length: 8 }, (_, i) => (
    <RainDrop
      key={i}
      $delay={i * 0.1}
      style={{
        left: `${10 + i * 10}%`,
        top: "-5px",
      }}
    />
  ));
};

const createSnowFlakes = () => {
  return Array.from({ length: 6 }, (_, i) => (
    <SnowFlake
      key={i}
      $delay={i * 0.3}
      $size={Math.random() * 4 + 2}
      style={{
        left: `${15 + i * 12}%`,
        top: "-5px",
      }}
    />
  ));
};

export const WeatherAvatar: React.FC<WeatherAvatarProps> = ({
  userName,
  weather,
  size = "md",
  className,
}) => {
  const initials = getInitials(userName);
  const avatarSize = sizes[size];
  const condition = weather?.condition || "sunny";

  const renderAvatar = () => {
    const baseProps = {
      $size: avatarSize,
      className,
      as: motion.div,
      whileHover: { scale: 1.05 },
      transition: { type: "spring", stiffness: 300 },
    };

    switch (condition) {
      case "rainy":
        return (
          <RainyAvatar {...baseProps}>
            {initials}
            <WeatherOverlay>{createRainDrops()}</WeatherOverlay>
          </RainyAvatar>
        );

      case "snowy":
        return (
          <SnowyAvatar {...baseProps}>
            {initials}
            <WeatherOverlay>{createSnowFlakes()}</WeatherOverlay>
          </SnowyAvatar>
        );

      case "cloudy":
        return (
          <CloudyAvatar {...baseProps}>
            {initials}
            <WeatherOverlay>
              <CloudOverlay />
            </WeatherOverlay>
          </CloudyAvatar>
        );

      case "stormy":
        return (
          <StormyAvatar {...baseProps}>
            {initials}
            <WeatherOverlay>
              {createRainDrops()}
              <CloudOverlay />
            </WeatherOverlay>
          </StormyAvatar>
        );

      case "foggy":
        return (
          <FoggyAvatar {...baseProps}>
            {initials}
            <WeatherOverlay>
              <CloudOverlay />
            </WeatherOverlay>
          </FoggyAvatar>
        );

      case "sunny":
      default:
        return <SunnyAvatar {...baseProps}>{initials}</SunnyAvatar>;
    }
  };

  return renderAvatar();
};
