# Playwright config for running tests on port 3002
# Sử dụng biến môi trường để chỉ định baseURL cho Playwright
# Tham khảo: https://playwright.dev/docs/test-configuration

# Để chạy Playwright test với baseURL là http://localhost:3002:
#   npx playwright test --base-url=http://localhost:3002

# Hoặc thêm vào playwright.config.ts như sau:
#
# import { defineConfig } from '@playwright/test';
# export default defineConfig({
#   use: {
#     baseURL: 'http://localhost:3002',
#   },
# });
