"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeatherAvatarProps } from "./WeatherAvatar.types";
import {
  sizes,
  WeatherOverlay,
  CloudOverlay,
  SunnyAvatar,
  CloudyAvatar,
  RainyAvatar,
  SnowyAvatar,
  StormyAvatar,
  FoggyAvatar,
} from "./WeatherAvatar.styles";
import { getInitials, createRainDrops, createSnowFlakes } from "./WeatherAvatar.utils";

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
