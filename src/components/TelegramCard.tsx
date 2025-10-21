import React from 'react';
import { useTelegramApp } from '../hooks/useTelegramApp';

interface TelegramCardProps {
  children: React.ReactNode;
  title?: string;
  padding?: string;
  className?: string;
}

export const TelegramCard: React.FC<TelegramCardProps> = ({
  children,
  title,
  padding = '16px',
  className = '',
}) => {
  const { theme } = useTelegramApp();
  
  const cardStyle: React.CSSProperties = {
    backgroundColor: theme?.bg_color || '#ffffff',
    color: theme?.text_color || '#000000',
    borderRadius: '10px',
    padding,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: theme?.text_color || '#000000',
  };

  return (
    <div style={cardStyle} className={className}>
      {title && <div style={titleStyle}>{title}</div>}
      {children}
    </div>
  );
};