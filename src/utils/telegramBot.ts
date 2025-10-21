// Hướng dẫn tích hợp với Telegram Bot

/**
 * Hướng dẫn tạo Telegram Bot và tích hợp với Web App
 * 
 * 1. Tạo Bot trên Telegram:
 *    - Mở Telegram và tìm BotFather (@BotFather)
 *    - Gửi lệnh /newbot và làm theo hướng dẫn
 *    - Lưu lại API Token được cung cấp
 * 
 * 2. Cấu hình Bot để sử dụng Web App:
 *    - Sử dụng lệnh /mybots trong BotFather
 *    - Chọn bot của bạn
 *    - Chọn "Bot Settings" > "Menu Button" hoặc "Inline Keyboard"
 *    - Thêm URL của Web App của bạn
 * 
 * 3. Xử lý dữ liệu từ Web App trong Bot:
 *    - Sử dụng thư viện như node-telegram-bot-api
 *    - Lắng nghe sự kiện web_app_data để nhận dữ liệu từ Web App
 * 
 * Ví dụ code xử lý dữ liệu từ Web App trong Bot (Node.js):
 * 
 * ```javascript
 * const TelegramBot = require('node-telegram-bot-api');
 * const token = 'YOUR_BOT_TOKEN';
 * const bot = new TelegramBot(token, { polling: true });
 * 
 * // Xử lý dữ liệu từ Web App
 * bot.on('web_app_data', (msg) => {
 *   const data = JSON.parse(msg.web_app_data.data);
 *   const chatId = msg.chat.id;
 *   
 *   if (data.type === 'message') {
 *     bot.sendMessage(chatId, `Đã nhận tin nhắn: ${data.content}`);
 *   } else if (data.type === 'action') {
 *     bot.sendMessage(chatId, `Đã nhận hành động: ${data.action}`);
 *   }
 * });
 * 
 * // Tạo nút mở Web App
 * bot.onText(/\/start/, (msg) => {
 *   const chatId = msg.chat.id;
 *   bot.sendMessage(chatId, 'Chào mừng đến với Bot!', {
 *     reply_markup: {
 *       keyboard: [
 *         [{ text: 'Mở Web App', web_app: { url: 'https://your-web-app-url.com' } }]
 *       ],
 *       resize_keyboard: true
 *     }
 *   });
 * });
 * ```
 */

export const TELEGRAM_BOT_GUIDE = {
  createBot: 'Sử dụng BotFather để tạo bot mới',
  configureWebApp: 'Cấu hình Bot để sử dụng Web App',
  handleData: 'Xử lý dữ liệu từ Web App trong Bot',
};