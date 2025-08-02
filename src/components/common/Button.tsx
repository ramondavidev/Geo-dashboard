import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const getVariantStyles = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primaryHover};
        }
      `;
    case "secondary":
      return css`
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.white};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.secondaryHover};
        }
      `;
    case "danger":
      return css`
        background-color: ${({ theme }) => theme.colors.danger};
        color: ${({ theme }) => theme.colors.white};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.dangerHover};
        }
      `;
    case "outline":
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.primary};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.white};
        }
      `;
    case "ghost":
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.textPrimary};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.gray100};
        }
      `;
    default:
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primaryHover};
        }
      `;
  }
};

const getSizeStyles = (size: ButtonProps["size"]) => {
  switch (size) {
    case "sm":
      return css`
        padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
        font-size: ${({ theme }) => theme.fontSizes.sm};
        height: 2rem;
      `;
    case "lg":
      return css`
        padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
        font-size: ${({ theme }) => theme.fontSizes.lg};
        height: 3rem;
      `;
    default:
      return css`
        padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
        font-size: ${({ theme }) => theme.fontSizes.base};
        height: 2.5rem;
      `;
  }
};

const StyledButton = styled(motion.button)<{
  $variant: ButtonProps["variant"];
  $size: ButtonProps["size"];
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  border: none;
  text-decoration: none;
  white-space: nowrap;

  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $size }) => getSizeStyles($size)}
  
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};
