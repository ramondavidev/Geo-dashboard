import styled, { keyframes } from "styled-components";

export const sizes = {
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

export const AvatarContainer = styled.div<{ $size: string }>`
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

export const WeatherOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
`;

export const RainDrop = styled.div<{ $delay: number }>`
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

export const SnowFlake = styled.div<{ $delay: number; $size: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: white;
  border-radius: 50%;
  animation: ${snowAnimation} 2s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  opacity: 0.8;
`;

export const CloudOverlay = styled.div`
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

export const SunnyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #ffd700, #ffb300);
  animation: ${sunGlow} 2s ease-in-out infinite;
`;

export const CloudyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #778899, #696969);
`;

export const RainyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #4682b4, #2f4f4f);
`;

export const SnowyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #e6e6fa, #b0c4de);
`;

export const StormyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #2f2f2f, #4b0082);
`;

export const FoggyAvatar = styled(AvatarContainer)`
  background: linear-gradient(135deg, #d3d3d3, #a9a9a9);
`;
