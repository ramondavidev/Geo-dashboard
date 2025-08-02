import styled, { css } from "styled-components";
import React, { forwardRef } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const getSizeStyles = (size: InputProps["size"]) => {
  switch (size) {
    case "sm":
      return css`
        height: 2rem;
        padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
        font-size: ${({ theme }) => theme.fontSizes.sm};
      `;
    case "lg":
      return css`
        height: 3rem;
        padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
        font-size: ${({ theme }) => theme.fontSizes.lg};
      `;
    default:
      return css`
        height: 2.5rem;
        padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
        font-size: ${({ theme }) => theme.fontSizes.base};
      `;
  }
};

const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{
  $size: InputProps["size"];
  $hasError?: boolean;
  $hasIcon?: boolean;
}>`
  width: 100%;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $size }) => getSizeStyles($size)}

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      padding-left: 2.5rem;
    `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.gray400};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? `${theme.colors.danger}20` : `${theme.colors.primary}20`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
`;

const HelperText = styled.span<{ $isError?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.danger : theme.colors.textSecondary};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = "md",
      fullWidth = false,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <InputWrapper $fullWidth={fullWidth}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <InputContainer>
          {icon && <IconContainer>{icon}</IconContainer>}
          <StyledInput
            ref={ref}
            $size={size}
            $hasError={!!error}
            $hasIcon={!!icon}
            {...props}
          />
        </InputContainer>
        {(error || helperText) && (
          <HelperText $isError={!!error}>{error || helperText}</HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";
