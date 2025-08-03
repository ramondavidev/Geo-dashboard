import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input<{ hasError?: boolean; disabled?: boolean }>`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 2px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.danger : theme.colors.gray300};
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: ${({ theme, disabled }) => 
    disabled ? theme.colors.gray100 : theme.colors.white};
  color: ${({ theme, disabled }) => 
    disabled ? theme.colors.textMuted : theme.colors.textPrimary};
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "text"};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const DropdownIcon = styled.div<{ isOpen: boolean; disabled?: boolean }>`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%) ${({ isOpen }) => isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.2s ease;
  color: ${({ theme, disabled }) => 
    disabled ? theme.colors.textMuted : theme.colors.textSecondary};
  pointer-events: none;
  font-size: 1.2rem;
`;

export const DropdownList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? "visible" : "hidden"};
  transform: translateY(${({ isOpen }) => isOpen ? "0" : "-10px"});
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const DropdownItem = styled.div<{ isHighlighted?: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  background-color: ${({ theme, isHighlighted }) => 
    isHighlighted ? theme.colors.gray100 : "transparent"};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ZipCode = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LocationInfo = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
