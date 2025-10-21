import React, { useState } from 'react';
import { useTelegramApp } from '../hooks/useTelegramApp';
import { TelegramButton } from '../components/TelegramButton';
import { TelegramCard } from '../components/TelegramCard';

export const HomePage: React.FC = () => {
  const { user, theme, sendData, showAlert } = useTelegramApp();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendData({ type: 'message', content: message });
      showAlert('Tin nhắn đã được gửi!');
      setMessage('');
    } else {
      showAlert('Vui lòng nhập tin nhắn!');
    }
  };

  const containerStyle: React.CSSProperties = {
    padding: '16px',
    backgroundColor: theme?.bg_color || '#ffffff',
    color: theme?.text_color || '#000000',
    minHeight: '100vh',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: `1px solid ${theme?.hint_color || '#cccccc'}`,
    backgroundColor: theme?.bg_color || '#ffffff',
    color: theme?.text_color || '#000000',
    marginBottom: '16px',
  };

  return (
    <div style={containerStyle}>
      <TelegramCard title="Thông tin người dùng">
        <p>ID: {user?.id || 'Không có'}</p>
        <p>Tên: {user?.first_name || 'Không có'} {user?.last_name || ''}</p>
        <p>Username: {user?.username || 'Không có'}</p>
      </TelegramCard>

      <TelegramCard title="Gửi tin nhắn đến Bot">
        <textarea
          style={inputStyle}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn của bạn..."
          rows={4}
        />
        <TelegramButton onClick={handleSendMessage} fullWidth>
          Gửi tin nhắn
        </TelegramButton>
      </TelegramCard>

      <TelegramCard title="Các tính năng Telegram Web App">
        <p style={{ marginBottom: '16px' }}>
          Telegram Web App cho phép bạn tạo các ứng dụng web tương tác với Telegram Bot.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <TelegramButton
            type="secondary"
            onClick={() => showAlert('Đây là một thông báo từ Telegram Web App!')}
          >
            Hiển thị thông báo
          </TelegramButton>
          <TelegramButton
            type="secondary"
            onClick={() => sendData({ type: 'action', action: 'example' })}
          >
            Gửi dữ liệu mẫu
          </TelegramButton>
        </div>
      </TelegramCard>
    </div>
  );
};