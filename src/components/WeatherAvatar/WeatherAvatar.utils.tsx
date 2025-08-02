import React from "react";
import { RainDrop, SnowFlake } from "./WeatherAvatar.styles";

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const createRainDrops = () => {
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

export const createSnowFlakes = () => {
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
