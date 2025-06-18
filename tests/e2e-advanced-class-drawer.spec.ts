import { test, expect } from '@playwright/test';

test.describe('UI: DrawerForm - Quản lý lớp học nâng cao', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('Tạo mới lớp học nâng cao với dữ liệu random', async ({ page }) => {
    test.setTimeout(60000);
    // Click button Quản lý lớp học nâng cao
    await page.getByRole('button', { name: /quản lý lớp học nâng cao/i }).click();
    // Chọn năm học
    await page.locator('#field-adv-schoolYear').click();
    await page.locator('.ant-select-item-option').first().click();
    // Chọn chương trình học
    await page.locator('#field-adv-curriculum').click();
    await page.locator('.ant-select-item-option').first().click();
    // Nhập tên lớp random
    const className = 'Lop' + Math.floor(Math.random() * 1000);
    await page.locator('#field-adv-className').fill(className);
    // Mã lớp sẽ tự động sinh, kiểm tra đúng format
    const classCode = await page.locator('#field-adv-classCode').inputValue();
    expect(classCode).toMatch(/^tds_tht_/);
    // Chọn khối học
    await page.locator('#field-adv-gradeLevel').click();
    await page.locator('.ant-select-item-option').first().click();
    // Chọn lớp ERP
    await page.locator('#field-adv-erpClass').click();
    await page.locator('.ant-select-item-option').first().click();
    // Chọn ban học (random)
    await page.locator('#field-adv-specialization').getByText(/phân ban|không phân ban/i).first().click();
    // Nếu chọn "Phân ban" thì chọn tiếp ban học
    const specialization = await page.locator('#field-adv-specialization input:checked').inputValue();
    if (specialization === 'split') {
      await page.locator('#field-adv-specializationDetail').click();
      await page.locator('.ant-select-item-option').first().click();
    }
    // Chọn giáo viên chủ nhiệm
    await page.locator('#field-adv-teacher').click();
    await page.locator('.ant-select-item-option').first().click();
    // Nhập sĩ số tối đa
    const maxStudent = Math.floor(Math.random() * 50) + 20;
    await page.locator('#field-adv-maxStudent').fill(maxStudent.toString());
    // Chọn trạng thái
    await page.locator('#field-adv-status').click();
    await page.locator('.ant-select-item-option').first().click();
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
