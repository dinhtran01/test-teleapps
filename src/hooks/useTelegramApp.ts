import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

// Định nghĩa kiểu dữ liệu cho người dùng
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

// Định nghĩa kiểu dữ liệu cho theme
interface TelegramTheme {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color?: string;
}

export const useTelegramApp = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [theme, setTheme] = useState<TelegramTheme | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Khởi tạo Telegram Web App
    try {
      // Nếu không chạy trong Telegram, sử dụng dữ liệu mẫu cho phát triển
      if (!WebApp.initData) {
        console.warn('Không chạy trong Telegram Web App, sử dụng dữ liệu mẫu');
        
        // Dữ liệu mẫu cho phát triển
        setUser({
          id: 12345678,
          first_name: 'Người dùng',
          last_name: 'Mẫu',
          username: 'user_test',
        });
      } else {
        // Lấy thông tin người dùng từ Telegram
        if (WebApp.initDataUnsafe.user) {
          setUser(WebApp.initDataUnsafe.user);
        }
      }

      // Lấy theme từ Telegram
      setTheme({
        bg_color: WebApp.themeParams.bg_color || '#ffffff',
        text_color: WebApp.themeParams.text_color || '#000000',
        hint_color: WebApp.themeParams.hint_color || '#999999',
        link_color: WebApp.themeParams.link_color || '#2481cc',
        button_color: WebApp.themeParams.button_color || '#2481cc',
        button_text_color: WebApp.themeParams.button_text_color || '#ffffff',
      });

      // Thông báo cho Telegram rằng ứng dụng đã sẵn sàng
      WebApp.ready();
      setIsReady(true);
    } catch (error) {
      console.error('Lỗi khi khởi tạo Telegram Web App:', error);
      // Sử dụng dữ liệu mẫu nếu có lỗi
      setUser({
        id: 12345678,
        first_name: 'Người dùng',
        last_name: 'Mẫu',
        username: 'user_test',
      });
      
      setTheme({
        bg_color: '#ffffff',
        text_color: '#000000',
        hint_color: '#999999',
        link_color: '#2481cc',
        button_color: '#2481cc',
        button_text_color: '#ffffff',
      });
      
      setIsReady(true);
    }
  }, []);

  // Hàm gửi dữ liệu về cho Telegram Bot
  const sendData = (data: any) => {
    try {
      WebApp.sendData(JSON.stringify(data));
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
    }
  };
  // Hàm đóng Web App
  const close = () => {
    try {
      WebApp.close();
    } catch (error) {
      console.error('Lỗi khi đóng Web App:', error);
    }
  };

  // Hàm mở link trong trình duyệt
  const openLink = (url: string) => {
    try {
      WebApp.openLink(url);
    } catch (error) {
      console.error('Lỗi khi mở link:', error);
      window.open(url, '_blank');
    }
  };

  // Hàm hiển thị thông báo
  const showAlert = (message: string) => {
    try {
      WebApp.showAlert(message);
    } catch (error) {
      console.error('Lỗi khi hiển thị thông báo:', error);
      // Không gọi alert(message) ở đây để tránh popup trùng lặp
    }
  };

  // Hàm hiển thị hộp thoại xác nhận
  const showConfirm = (message: string, callback: (confirmed: boolean) => void) => {
    try {
      WebApp.showConfirm(message, callback);
    } catch (error) {
      console.error('Lỗi khi hiển thị hộp thoại xác nhận:', error);
      const confirmed = window.confirm(message);
      callback(confirmed);
    }
  };

  // Các phương thức quản lý Main Button
  const showMainButton = (text: string, onClick: () => void) => {
    try {
      WebApp.MainButton.setText(text);
      WebApp.MainButton.onClick(onClick);
      WebApp.MainButton.show();
    } catch (error) {
      console.error('Lỗi khi hiển thị Main Button:', error);
    }
  };

  const hideMainButton = () => {
    try {
      WebApp.MainButton.hide();
    } catch (error) {
      console.error('Lỗi khi ẩn Main Button:', error);
    }
  };

  const setMainButtonText = (text: string) => {
    try {
      WebApp.MainButton.setText(text);
    } catch (error) {
      console.error('Lỗi khi đặt text cho Main Button:', error);
    }
  };

  const setMainButtonColor = (color: string) => {
    try {
      WebApp.MainButton.setColor(color as `#${string}`);
    } catch (error) {
      console.error('Lỗi khi đặt màu cho Main Button:', error);
    }
  };

  const setMainButtonProgress = (isProgress: boolean) => {
    try {
      if (isProgress) {
        WebApp.MainButton.showProgress();
      } else {
        WebApp.MainButton.hideProgress();
      }
    } catch (error) {
      console.error('Lỗi khi đặt trạng thái progress cho Main Button:', error);
    }
  };

  // Các phương thức quản lý Back Button
  const showBackButton = (onClick: () => void) => {
    try {
      WebApp.BackButton.onClick(onClick);
      WebApp.BackButton.show();
    } catch (error) {
      
      console.error('Lỗi khi hiển thị Back Button:', error);
    }
  };

  const hideBackButton = () => {
    try {
      WebApp.BackButton.hide();
    } catch (error) {
      console.error('Lỗi khi ẩn Back Button:', error);
    }
  };

  return {
    user,
    theme,
    isReady,
    sendData,
    close,
    openLink,
    showAlert,
    showConfirm,
    webApp: WebApp,
    // Thêm các phương thức Main Button
    showMainButton,
    hideMainButton,
    setMainButtonText,
    setMainButtonColor,
    setMainButtonProgress,
    // Thêm các phương thức Back Button
    showBackButton,
    hideBackButton
  };
};