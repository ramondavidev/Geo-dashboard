import styled from "styled-components";
import { motion } from "framer-motion";

export const FooterContainer = styled(motion.footer)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  padding: ${({ theme }) => theme.spacing.md} 0;
  z-index: 10;
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.spacing.lg}`};
`;

export const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const CreatedByText = styled.span`
  color: ${({ theme }) => theme.colors.gray500};
`;

export const AuthorLink = styled.a`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: linear-gradient(135deg, #9333EA, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, #7C3AED, #2563EB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #9333EA, #3B82F6);
    transition: width 0.2s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.gray300};
`;

export const PassionSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const StarIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #A855F7, #3B82F6);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 10px;
    height: 10px;
    color: white;
    fill: currentColor;
  }
`;

export const PassionText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray400};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
