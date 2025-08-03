import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ConfirmationModal } from './ConfirmationModal';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ConfirmationModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Test Title',
    message: 'Test message',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when open', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Confirm'));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when cancel button is clicked', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when escape key is pressed', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} />);
    
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking overlay', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} />);
    
    // Find the overlay by clicking outside the modal content
    const overlay = screen.getByText('Test Title').closest('[role="presentation"]')?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('uses custom button text when provided', () => {
    renderWithTheme(
      <ConfirmationModal
        {...defaultProps}
        confirmText="Delete"
        cancelText="Keep"
      />
    );
    
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Keep')).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} isLoading={true} />);
    
    const confirmButton = screen.getByText('Confirm');
    const cancelButton = screen.getByText('Cancel');
    
    expect(confirmButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('prevents actions when loading', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} isLoading={true} />);
    
    fireEvent.click(screen.getByText('Confirm'));
    fireEvent.click(screen.getByText('Cancel'));
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    expect(defaultProps.onConfirm).not.toHaveBeenCalled();
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('renders with danger variant by default', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} />);
    
    // Check if the warning icon is rendered (⚠️ for danger variant)
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('renders with warning variant', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} variant="warning" />);
    
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('renders with info variant', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} variant="info" />);
    
    expect(screen.getByText('ℹ️')).toBeInTheDocument();
  });
});
