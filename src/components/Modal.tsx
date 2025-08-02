import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { Button } from "./common/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const getSizeStyles = (size: ModalProps["size"]) => {
  switch (size) {
    case "sm":
      return css`
        max-width: 400px;
      `;
    case "lg":
      return css`
        max-width: 800px;
      `;
    default:
      return css`
        max-width: 500px;
      `;
  }
};

const ModalContent = styled(motion.div)<{ $size: ModalProps["size"] }>`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${({ $size }) => getSizeStyles($size)}
`;

const ModalHeader = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

const CloseButton = styled(Button)`
  min-width: auto;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  flex: 1;
`;

const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            // Close modal when clicking on overlay (not on modal content)
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <ModalContent
            $size={size}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <CloseButton
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </CloseButton>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalContent>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
