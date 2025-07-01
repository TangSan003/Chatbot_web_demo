# Chatbot Travel Assistant

Trợ lý du lịch AI với Next.js và HuggingFace

## Tính năng

- Giao diện chat nhiều lượt
- Trích xuất thực thể từ lịch sử chat
- Xử lý ngôn ngữ tự nhiên
- Hỗ trợ tiếng Việt
- Container hóa với Docker

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` với thông tin API:
```
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

3. Chạy chế độ phát triển:
```bash
npm run dev
```

4. Truy cập ứng dụng tại `http://localhost:3000`

## Docker

1. Build và chạy với Docker Compose:
```bash
docker-compose up --build
```

2. Truy cập ứng dụng tại `http://localhost:3000`

## Cấu trúc dự án

```
src/
├── app/              # Next.js app router
│   ├── api/          # API routes
│   └── page.tsx      # Trang chính
├── components/       # React components
│   ├── ChatInterface.tsx
│   └── MessageBubble.tsx
├── lib/             # Thư viện hỗ trợ
│   ├── entityExtractor.ts
│   └── entityMerger.ts
└── types/           # TypeScript types
```

## Tech Stack

- Frontend: Next.js 14, React, Tailwind CSS
- Backend: Node.js, HuggingFace Inference API
- AI: LangChain, OpenAI
- Container: Docker
- Language: TypeScript

## Môi trường

- `HUGGINGFACE_API_KEY`: API key của HuggingFace
- `PORT`: Cổng ứng dụng (mặc định: 3000)

## Contributing

1. Fork repository
2. Tạo branch mới
3. Commit thay đổi
4. Push lên branch
5. Tạo Pull Request

## Giấy phép

MIT
