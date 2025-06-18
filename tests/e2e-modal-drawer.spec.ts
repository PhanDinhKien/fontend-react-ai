import { test, expect } from '@playwright/test';

// Đảm bảo các selector dưới đây đúng với code thực tế của bạn
// Có thể cần chỉnh lại selector cho phù hợp

test.describe('UI: Modal & Drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('Nhập và lưu dữ liệu ở Drawer Form (random, antd selectors)', async ({ page }) => {
    test.setTimeout(60000);
    await page.getByRole('button', { name: /show drawer form/i }).click();

    // 1. Nhập các trường text/input với dữ liệu random
    const randomEmail = 'user' + Math.floor(Math.random() * 10000) + '@example.com';
    await page.locator('#field-name').fill('User ' + Math.floor(Math.random() * 10000));
    await page.locator('#field-email').fill(randomEmail);
    // Nếu email là phandinhkienmta@gmail.com thì mới điền password, ngược lại bỏ qua
    if (randomEmail === 'phandinhkienmta@gmail.com') {
      await page.locator('#field-password').fill(Math.random().toString(36).slice(-8));
    } else {
      // Bỏ qua điền password nếu email không đúng
      console.log('Bỏ qua điền password vì email không phải phandinhkienmta@gmail.com');
    }
    await page.locator('#field-phone').fill('09' + Math.floor(10000000 + Math.random() * 89999999));
    await page.locator('#field-amount').fill((Math.floor(Math.random() * 100) + 1).toString());
    await page.locator('#field-money').fill((Math.floor(Math.random() * 1000000) + 1000).toString());
    await page.locator('#field-birthday').fill('2000-01-01');
    await page.locator('#field-time').fill('12:00');
    await page.locator('#field-dateTime').fill('2000-01-01 12:00');
    await page.locator('#field-desc').fill('Test mô tả tự động ' + Math.random().toString(36).slice(-6));
    // // Slider: click vào giữa thanh slider để chọn giá trị 50 (nếu slider hiển thị)
    const sliderBar = page.locator('#field-slider .ant-slider');
    if (await sliderBar.count() > 0 && await sliderBar.isVisible()) {
      const box = await sliderBar.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      }
    } else {
      console.log('Slider không hiển thị, bỏ qua thao tác slider');
    }
    // Rate: click vào ngôi sao thứ 3 để chọn 3 sao
    await page.locator('#field-rate .ant-rate-star').nth(Math.floor(Math.random() * 5)).click();
    await page.locator('#field-percent').fill((Math.floor(Math.random() * 100)).toString());
    await page.locator('#field-url').fill('https://test' + Math.floor(Math.random() * 10000) + '.com');
    await page.locator('#field-json').fill('{"a":' + Math.floor(Math.random() * 100) + '}');
    await page.locator('#field-code').fill('console.log("' + Math.random().toString(36).slice(-6) + '")');

    // 2. Select/Radio/Checkbox/Switch
    await page.locator('#field-type').click();
    const typeOptions = ['Admin', 'User', 'Guest'];
    const typeRandom = typeOptions[Math.floor(Math.random() * typeOptions.length)];
    await page.locator('.ant-select-item-option').filter({ hasText: typeRandom }).click();
    await page.locator('#field-class').click();
    const classOptions = ['A1', 'A2', 'B1', 'B2'];
    const classRandom = classOptions[Math.floor(Math.random() * classOptions.length)];
    await page.locator('.ant-select-item-option').filter({ hasText: classRandom }).click();
    await page.locator('#field-radio').getByLabel('Có').check();
    // await page.locator('#field-checkbox').check();
    await page.locator('#field-switch').click();
    // 3. Nhóm trường group
    await page.locator('#field-group1').fill('Group1 ' + Math.random().toString(36).slice(-4));
    await page.locator('#field-group2').fill('Group2 ' + Math.random().toString(36).slice(-4));
    // 4. Nhấn nút Lưu
    const luuButtons = await page.locator('button', { hasText: 'Lưu' });
    if (await luuButtons.count() > 0) {
      await luuButtons.first().click({ force: true });
      console.log('Đã nhấn nút Lưu (button đầu tiên có text Lưu)');
    } else {
      throw new Error('Không tìm thấy nút Lưu');
    }
    // 5. Chờ dialog hoặc Drawer đóng
    await page.waitForTimeout(2000);
    // Có thể kiểm tra Drawer đóng hoặc alert xuất hiện nếu cần
  });
});
