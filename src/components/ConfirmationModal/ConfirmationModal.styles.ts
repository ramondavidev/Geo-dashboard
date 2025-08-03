import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  max-width: 420px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 0 24px;
  text-align: center;
`;

export const IconContainer = styled.div<{ $variant: 'danger' | 'warning' | 'info' }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 20px;
  background-color: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'danger':
        return theme.colors.danger + '15';
      case 'warning':
        return theme.colors.warning + '15';
      case 'info':
        return theme.colors.primary + '15';
      default:
        return theme.colors.danger + '15';
    }
  }};
  color: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'danger':
        return theme.colors.danger;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.primary;
      default:
        return theme.colors.danger;
    }
  }};
`;

export const ModalTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ModalMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const ConfirmButton = styled(Button)<{ $variant: 'danger' | 'warning' | 'info' }>`
  background-color: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'danger':
        return theme.colors.danger;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.primary;
      default:
        return theme.colors.danger;
    }
  }};
  
  &:hover:not(:disabled) {
    background-color: ${({ $variant, theme }) => {
      switch ($variant) {
        case 'danger':
          return theme.colors.dangerHover;
        case 'warning':
          return theme.colors.warningHover;
        case 'info':
          return theme.colors.primaryHover;
        default:
          return theme.colors.dangerHover;
      }
    }};
  }
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray50};
    border-color: ${({ theme }) => theme.colors.gray400};
  }
`;

// Animation variants
export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: -20,
    transition: {
      duration: 0.15
    }
  }
};
