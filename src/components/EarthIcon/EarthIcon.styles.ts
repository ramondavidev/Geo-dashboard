import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

export const EarthContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const Glow = styled(motion.div)`
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.primary}40 0%,
    ${({ theme }) => theme.colors.secondary}20 50%,
    transparent 70%
  );
  z-index: 1;
`;

export const EarthImage = styled(motion(Image))`
  position: relative;
  z-index: 2;
  border-radius: 50%;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
  object-fit: cover;
`;
