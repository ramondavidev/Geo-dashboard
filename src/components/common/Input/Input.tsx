import React, { forwardRef } from "react";
import { InputProps } from "./Input.types";
import {
  InputWrapper,
  Label,
  InputContainer,
  StyledInput,
  IconContainer,
  HelperText,
} from "./Input.styles";

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
