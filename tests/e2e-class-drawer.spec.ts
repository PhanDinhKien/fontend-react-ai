import { test, expect } from '@playwright/test';

test.describe('UI: DrawerForm - Quản lý lớp học', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('Tạo mới lớp học với dữ liệu random', async ({ page }) => {
    test.setTimeout(60000);
    // Click button Quản lý lớp học
    await page.getByRole('button', { name: /quản lý lớp học/i }).click();
    // Chọn năm học
    await page.locator('#field-class-year').click();
    await page.locator('.ant-select-item-option').first().click();
    // Nhập tên lớp random
    const className = 'Lop' + Math.floor(Math.random() * 1000);
    await page.locator('#field-class-name').fill(className);
    // Mã lớp sẽ tự động sinh, kiểm tra đúng format
    const classCode = await page.locator('#field-class-code').inputValue();
    expect(classCode).toMatch(/^SMIS_THT_/);
    // Chọn địa điểm (hoặc thêm mới)
    await page.locator('#field-class-location').click();
    await page.locator('.ant-select-item-option').first().click();
    // Bật/tắt hoạt động
    await page.locator('#field-class-active').click();
    // Nhấn Lưu
    const saveBtn = await page.locator('button', { hasText: 'Lưu' });
    if (await saveBtn.count() > 0) {
      await saveBtn.first().click({ force: true });
    } else {
      throw new Error('Không tìm thấy nút Lưu');
    }
    // Chờ Drawer đóng
    await page.waitForTimeout(1500);
    // Có thể kiểm tra message thành công nếu cần
  });
});
