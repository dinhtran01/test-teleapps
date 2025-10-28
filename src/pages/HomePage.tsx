import React, { useState, useEffect } from 'react';
import { useTelegramApp } from '../hooks/useTelegramApp';
import { TelegramCard } from '../components/TelegramCard';
import { TelegramButton } from '../components/TelegramButton';

interface MessageItem {
  id: number;
  content: string;
  timestamp: Date;
}

export const HomePage: React.FC = () => {
  const {
    user,
    theme,
    sendData,
    showAlert,
    showMainButton,
    hideMainButton,
    setMainButtonProgress,
    webApp,
    showBackButton,
    hideBackButton
  } = useTelegramApp();
  
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState<MessageItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Hàm xử lý gửi tin nhắn chung
  const sendMessage = () => {
    if (!message.trim()) {
      return false;
    }
    
    if (isProcessing) {
      return false; // Ngăn gửi nhiều lần
    }
    
    setIsProcessing(true);
    setMainButtonProgress(true);
    
    // Gửi tin nhắn đến bot
    sendData({ type: 'message', content: message });
    
    // Thêm tin nhắn vào lịch sử
    const newMessage: MessageItem = {
      id: Date.now(),
      content: message,
      timestamp: new Date()
    };
    setMessageHistory(prev => [...prev, newMessage]);
    
    // Đặt lại trạng thái
    setTimeout(() => {
      setMainButtonProgress(false);
      setIsProcessing(false);
      setMessage('');
      showAlert('Tin nhắn đã được gửi!'); // Thêm alert ở đây
    }, 500);
    
    return true;
  };

  useEffect(() => {
    showMainButton('Gửi tin nhắn', () => {
      if (!message.trim()) {
        return;
      }
      sendMessage();
    });

    // Thiết lập Back Button
    showBackButton(() => {
      webApp?.close();
    });

    // Ẩn các nút khi component unmount
    return () => {
      hideMainButton();
      hideBackButton();
    };
  }, [showMainButton, hideMainButton, showBackButton, hideBackButton, webApp, message, sendMessage]);

  // Cập nhật Main Button khi message thay đổi
  useEffect(() => {
    if (!message.trim()) {
      showMainButton('Nhập tin nhắn', () => {
        // Không hiển thị alert
      });
    } else {
      showMainButton('Gửi tin nhắn', () => {
        sendMessage();
      });
    }
  }, [message]);



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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          {user?.photo_url ? (
            <img 
              src={user.photo_url} 
              alt="Avatar" 
              style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                marginRight: '16px',
                border: `2px solid ${theme?.button_color || '#2481cc'}`
              }} 
            />
          ) : (
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: theme?.button_color || '#2481cc',
              color: theme?.button_text_color || '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              marginRight: '16px'
            }}>
              {user?.first_name ? user.first_name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {user?.first_name || 'Không có'} {user?.last_name || ''}
            </p>
            <p style={{ color: theme?.hint_color || '#999999', fontSize: '14px' }}>
              @{user?.username || 'không có username'}
            </p>
          </div>
        </div>
        <p>ID: {user?.id || 'Không có'}</p>
      </TelegramCard>

      <TelegramCard title="Gửi tin nhắn đến Bot">
        <textarea
          style={inputStyle}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn của bạn..."
          rows={4}
        />

        
        {/* {messageHistory.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ 
              color: theme?.text_color || '#000000', 
              borderBottom: `1px solid ${theme?.hint_color || '#cccccc'}`,
              paddingBottom: '8px',
              marginBottom: '8px'
            }}>
              Lịch sử tin nhắn đã gửi
            </h4>
            <div style={{ 
              maxHeight: '200px', 
              overflowY: 'auto',
              border: `1px solid ${theme?.hint_color || '#cccccc'}`,
              borderRadius: '8px',
              padding: '8px'
            }}>
              {messageHistory.map((msg) => (
                <div key={msg.id} style={{ 
                  padding: '8px', 
                  marginBottom: '8px',
                  backgroundColor: theme?.secondary_bg_color || '#f0f0f0',
                  borderRadius: '8px'
                }}>
                  <p style={{ margin: '0 0 4px 0', wordBreak: 'break-word' }}>{msg.content}</p>
                  <small style={{ 
                    color: theme?.hint_color || '#999999',
                    fontSize: '12px'
                  }}>
                    {msg.timestamp.toLocaleTimeString()}
                  </small>
                </div>
              ))}
            </div>
          </div>
        )} */}
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