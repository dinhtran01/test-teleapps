import React from 'react';
import { useTelegramApp } from '../hooks/useTelegramApp';

interface TelegramButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  fullWidth?: boolean;
}

export const TelegramButton: React.FC<TelegramButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
  fullWidth = false,
}) => {
  const { theme } = useTelegramApp();
  
  const buttonStyle: React.CSSProperties = {
    backgroundColor: type === 'primary' ? theme?.button_color || '#2481cc' : 'transparent',
    color: type === 'primary' ? theme?.button_text_color || '#ffffff' : theme?.button_color || '#2481cc',
    border: type === 'secondary' ? `1px solid ${theme?.button_color || '#2481cc'}` : 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.2s ease',
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};