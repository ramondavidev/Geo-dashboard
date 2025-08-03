import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ConfirmationModalProps } from "./ConfirmationModal.types";
import {
  Overlay,
  ModalContent,
  ModalHeader,
  IconContainer,
  ModalTitle,
  ModalMessage,
  ModalBody,
  ActionButtons,
  ConfirmButton,
  CancelButton,
  overlayVariants,
  modalVariants,
} from "./ConfirmationModal.styles";

const getIconForVariant = (variant: 'danger' | 'warning' | 'info') => {
  switch (variant) {
    case 'danger':
      return '⚠️';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    default:
      return '⚠️';
  }
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
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
  }, [isOpen, onClose, isLoading]);

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            // Close modal when clicking on overlay (not on modal content) and not loading
            if (e.target === e.currentTarget && !isLoading) {
              onClose();
            }
          }}
        >
          <ModalContent
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <IconContainer $variant={variant}>
                {getIconForVariant(variant)}
              </IconContainer>
              <ModalTitle>{title}</ModalTitle>
              <ModalMessage>{message}</ModalMessage>
            </ModalHeader>
            <ModalBody>
              <ActionButtons>
                <CancelButton
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  {cancelText}
                </CancelButton>
                <ConfirmButton
                  $variant={variant}
                  onClick={handleConfirm}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {confirmText}
                </ConfirmButton>
              </ActionButtons>
            </ModalBody>
          </ModalContent>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
