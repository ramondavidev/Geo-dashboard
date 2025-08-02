import styled from "styled-components";
import { motion } from "framer-motion";

export const sizes = {
  sm: { width: "120px", fontSize: "0.75rem", padding: "0.5rem" },
  md: { width: "160px", fontSize: "0.875rem", padding: "0.75rem" },
  lg: { width: "200px", fontSize: "1rem", padding: "1rem" },
};

export const ClockContainer = styled(motion.div)<{ $size: keyof typeof sizes }>`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ $size }) => sizes[$size].padding};
  width: ${({ $size }) => sizes[$size].width};
  color: white;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 2px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const UserName = styled.div<{ $size: keyof typeof sizes }>`
  font-size: ${({ $size }) => sizes[$size].fontSize};
  font-weight: 600;
  margin-bottom: 0.25rem;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TimeDisplay = styled.div<{ $size: keyof typeof sizes }>`
  font-size: ${({ $size }) => {
    const baseSizes = { sm: "1.1rem", md: "1.3rem", lg: "1.5rem" };
    return baseSizes[$size];
  }};
  font-weight: 700;
  font-family: "Monaco", "Menlo", monospace;
  margin-bottom: 0.25rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const TimezoneLabel = styled.div<{ $size: keyof typeof sizes }>`
  font-size: ${({ $size }) => {
    const baseSizes = { sm: "0.65rem", md: "0.75rem", lg: "0.85rem" };
    return baseSizes[$size];
  }};
  opacity: 0.8;
  font-weight: 500;
`;

export const DateDisplay = styled.div<{ $size: keyof typeof sizes }>`
  font-size: ${({ $size }) => {
    const baseSizes = { sm: "0.6rem", md: "0.7rem", lg: "0.8rem" };
    return baseSizes[$size];
  }};
  opacity: 0.7;
  margin-top: 0.25rem;
`;
