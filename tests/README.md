# Automation Tests

Thư mục này chứa các file automation test cho dự án React + TypeScript.

## Đề xuất cấu trúc

- `e2e/` — End-to-end tests (ví dụ: Playwright, Cypress)
- `unit/` — Unit tests (ví dụ: Jest, React Testing Library)
- `utils/` — Các tiện ích, cấu hình chung cho test

## Hướng dẫn

- Đặt các file test theo module hoặc page tương ứng.
- Có thể đặt các file test song song với source code (ví dụ: `*.test.tsx` trong `src/`), hoặc tách riêng vào thư mục này.
- Cấu hình test runner (Jest, Playwright, v.v.) trong root hoặc trong thư mục này.

---

This folder is for all automation test code (unit, integration, e2e, etc).
