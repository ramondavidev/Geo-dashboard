import React from "react";
import { EarthIconProps } from "./EarthIcon.types";
import { EarthContainer, EarthImage, Glow } from "./EarthIcon.styles";

export const EarthIcon: React.FC<EarthIconProps> = ({
  size = 64,
  className,
}) => {
  return (
    <EarthContainer className={className} style={{ width: size, height: size }}>
      <Glow />

      <EarthImage src="/earth.png" alt="Earth" width={size} height={size} />
    </EarthContainer>
  );
};
