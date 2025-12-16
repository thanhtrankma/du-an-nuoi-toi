# Nuôi Tôi - Feed Me Project 🌱

Dự án React.js sử dụng Vite để tạo trang web kêu gọi tài trợ lương thực cho sinh viên với đầy đủ tính năng đa ngôn ngữ và theo dõi giao dịch realtime.

## 🚀 Tính năng

- ✅ **Đa ngôn ngữ**: Hỗ trợ 8 ngôn ngữ (Tiếng Việt, English, 中文, 日本語, 한국어, Français, Русский, ไทย)
- ✅ **Dashboard realtime**: Hiển thị số dư và tiến độ mục tiêu
- ✅ **Lịch sử giao dịch**: Sao kê realtime với animation
- ✅ **QR Code thanh toán**: Tích hợp MB Bank QR Code
- ✅ **Responsive Design**: Tối ưu cho mọi thiết bị
- ✅ **Animations**: Smooth transitions và hover effects
- ✅ **Messenger-style Popup**: Thông báo giao dịch mới

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Công nghệ sử dụng

- **React 19** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Nunito, Noto Sans)

## 📁 Cấu trúc thư mục

```
nuoi-toi-app/
├── src/
│   ├── components/       # React components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Dashboard.jsx
│   │   ├── SpendingPlan.jsx
│   │   ├── History.jsx
│   │   ├── Donate.jsx
│   │   ├── Footer.jsx
│   │   ├── Preloader.jsx
│   │   └── MessengerPopup.jsx
│   ├── contexts/         # React Context
│   │   └── LanguageContext.jsx
│   ├── utils/            # Utilities
│   │   └── transactions.js
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind config
└── package.json
```

## ⚙️ Cấu hình

### Thay đổi thông tin tài khoản

Chỉnh sửa trong `src/components/Donate.jsx`:
- `accountNumber`: Số tài khoản
- `accountName`: Tên chủ tài khoản
- QR Code image URL

### Thêm giao dịch mới

Chỉnh sửa `src/utils/transactions.js` để thêm giao dịch ban đầu hoặc sử dụng hàm `addNewTransaction` trong `App.jsx`.

### Thay đổi mục tiêu

Chỉnh sửa prop `goal` trong component `Dashboard` (mặc định: 1,000,000 VND).

## 🌍 Thêm ngôn ngữ mới

1. Thêm config vào `langConfig` trong `LanguageContext.jsx`
2. Thêm translations vào object `translations` với key tương ứng

## 📝 License

MIT

## 👤 Author

Feed Me Project
