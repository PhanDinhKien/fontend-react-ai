# Test info

- Name: UI: DrawerForm - Quản lý lớp học >> Tạo mới lớp học với dữ liệu random
- Location: /Users/kienkien/Documents/PhanSoftware/NETCORE/fe/app/tests/e2e-class-drawer.spec.ts:8:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: /quản lý lớp học/i }) resolved to 2 elements:
    1) <button>Quản lý lớp học</button> aka getByRole('button', { name: 'Quản lý lớp học', exact: true })
    2) <button type="button" class="ant-btn css-dev-only-do-not-override-mc1tut ant-btn-primary ant-btn-color-primary ant-btn-variant-solid">…</button> aka getByRole('button', { name: 'Quản lý lớp học nâng cao' })

Call log:
  - waiting for getByRole('button', { name: /quản lý lớp học/i })

    at /Users/kienkien/Documents/PhanSoftware/NETCORE/fe/app/tests/e2e-class-drawer.spec.ts:11:66
```

# Page snapshot

```yaml
- banner:
  - img "Logo"
  - combobox
  - text: en-US
  - combobox
  - text: Light
- complementary:
  - menu:
    - menuitem "user Home":
      - img "user"
      - text: Home
    - menuitem "video-camera About":
      - img "video-camera"
      - text: About
  - img "left"
- main:
  - heading "About Page" [level=2]
  - paragraph: This is a sample About page. You can put any content here.
  - button "Show Warning Modal"
  - button "Show Modal Default"
  - button "Show Drawer Form"
  - button "Show Dynamic Form"
  - button "Quản lý lớp học"
  - button "Quản lý lớp học nâng cao"
  - table:
    - rowgroup:
      - row "User Email Status Create Date Type Action":
        - columnheader "User"
        - columnheader "Email"
        - columnheader "Status"
        - columnheader "Create Date"
        - columnheader "Type"
        - columnheader "Action"
    - rowgroup:
      - row "John Doe idcard 11904047 john@example.com Active 2025-06-01 Admin form":
        - cell "John Doe idcard 11904047":
          - img
          - text: John Doe
          - img "idcard"
          - text: "11904047"
        - cell "john@example.com"
        - cell "Active"
        - cell "2025-06-01"
        - cell "Admin"
        - cell "form":
          - button "form":
            - img "form"
          - button:
            - img
      - row "Jane Smith idcard 11904048 jane@example.com Inactive 2025-05-15 User form":
        - cell "Jane Smith idcard 11904048":
          - img
          - text: Jane Smith
          - img "idcard"
          - text: "11904048"
        - cell "jane@example.com"
        - cell "Inactive"
        - cell "2025-05-15"
        - cell "User"
        - cell "form":
          - button "form":
            - img "form"
          - button:
            - img
      - row "Alice Johnson idcard 11904049 alice@example.com Pending 2025-04-20 Guest form":
        - cell "Alice Johnson idcard 11904049":
          - img
          - text: Alice Johnson
          - img "idcard"
          - text: "11904049"
        - cell "alice@example.com"
        - cell "Pending"
        - cell "2025-04-20"
        - cell "Guest"
        - cell "form":
          - button "form":
            - img "form"
          - button:
            - img
  - list:
    - listitem "Previous Page":
      - button "left" [disabled]:
        - img "left"
    - listitem "1"
    - listitem "Next Page":
      - button "right" [disabled]:
        - img "right"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('UI: DrawerForm - Quản lý lớp học', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('/about');
   6 |   });
   7 |
   8 |   test('Tạo mới lớp học với dữ liệu random', async ({ page }) => {
   9 |     test.setTimeout(60000);
  10 |     // Click button Quản lý lớp học
> 11 |     await page.getByRole('button', { name: /quản lý lớp học/i }).click();
     |                                                                  ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: /quản lý lớp học/i }) resolved to 2 elements:
  12 |     // Chọn năm học
  13 |     await page.locator('#field-class-year').click();
  14 |     await page.locator('.ant-select-item-option').first().click();
  15 |     // Nhập tên lớp random
  16 |     const className = 'Lop' + Math.floor(Math.random() * 1000);
  17 |     await page.locator('#field-class-name').fill(className);
  18 |     // Mã lớp sẽ tự động sinh, kiểm tra đúng format
  19 |     const classCode = await page.locator('#field-class-code').inputValue();
  20 |     expect(classCode).toMatch(/^SMIS_THT_/);
  21 |     // Chọn địa điểm (hoặc thêm mới)
  22 |     await page.locator('#field-class-location').click();
  23 |     await page.locator('.ant-select-item-option').first().click();
  24 |     // Bật/tắt hoạt động
  25 |     await page.locator('#field-class-active').click();
  26 |     // Nhấn Lưu
  27 |     const saveBtn = await page.locator('button', { hasText: 'Lưu' });
  28 |     if (await saveBtn.count() > 0) {
  29 |       await saveBtn.first().click({ force: true });
  30 |     } else {
  31 |       throw new Error('Không tìm thấy nút Lưu');
  32 |     }
  33 |     // Chờ Drawer đóng
  34 |     await page.waitForTimeout(1500);
  35 |     // Có thể kiểm tra message thành công nếu cần
  36 |   });
  37 | });
  38 |
```