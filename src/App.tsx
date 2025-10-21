import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { useTelegramApp } from './hooks/useTelegramApp';
import { HomePage } from './pages/HomePage';

function App() {
  const { theme, isReady } = useTelegramApp();

  // Áp dụng theme của Telegram vào toàn bộ ứng dụng
  useEffect(() => {
    if (theme) {
      document.body.style.backgroundColor = theme.bg_color;
      document.body.style.color = theme.text_color;
    }
  }, [theme]);

  if (!isReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: theme?.bg_color || '#ffffff',
        color: theme?.text_color || '#000000'
      }}>
        Đang tải ứng dụng Telegram...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
