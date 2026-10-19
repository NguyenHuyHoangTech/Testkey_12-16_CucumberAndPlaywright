# AutomationPractical - Cucumber + Playwright + TypeScript

Dự án Automation Testing sử dụng **Playwright**, **Cucumber (BDD)** và **TypeScript** cho website [Automation Exercise](https://automationexercise.com/).

---

## 📁 Cấu trúc dự án

```text
AutomationPractical/
├── .github/
│   └── workflows/
│       └── tests.yml             # GitHub Actions CI workflow
├── features/
│   ├── login.feature             # Kịch bản BDD đăng nhập
│   ├── tc12_add_products_in_cart.feature
│   ├── tc13_verify_product_quantity.feature
│   ├── tc14_place_order_register_while_checkout.feature
│   ├── tc15_place_order_register_before_checkout.feature
│   ├── tc16_place_order_login_before_checkout.feature
│   ├── tc20_search_products_verify_cart_after_login.feature
│   ├── tc23_verify_address_details_in_checkout.feature
│   └── tc25_verify_scroll_up_using_arrow_button.feature
├── node_modules/
├── pages/                        # Page Object Model (POM)
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── PaymentPage.ts
├── playwright-report/
│   └── index.html                # Báo cáo Playwright HTML
├── steps/                        # Step Definitions
│   ├── hooks.ts
│   ├── login.steps.ts
│   ├── products.steps.ts
│   └── checkout.steps.ts
├── support/                      # Cucumber Support (World & Hooks)
│   ├── hooks.ts                  # Vòng đời browser & chụp màn hình khi fail
│   └── world.ts                  # Cucumber CustomWorld định nghĩa Playwright Page/Context
├── test-results/
│   ├── .last-run.json
│   └── cucumber-report.html      # Báo cáo kết quả kiểm thử Cucumber HTML
├── tests/
│   └── example.spec.ts           # Playwright Test Spec mẫu
├── .env                          # Biến môi trường (BASE_URL, BROWSER, HEADLESS)
├── .gitignore
├── cucumber.js                   # Cấu hình Cucumber runner
├── package.json
├── package-lock.json
├── playwright.config.ts          # Cấu hình Playwright test runner
├── README.md
└── tsconfig.json                 # Cấu hình TypeScript
```

---

## 🚀 Cài đặt & Chuẩn bị

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

2. **Cài đặt trình duyệt Playwright:**
   ```bash
   npx playwright install chromium
   ```

---

## 🧪 Chạy Kiểm thử

### 1. Chạy với Cucumber (BDD)

* **Chạy toàn bộ kịch bản Cucumber:**
  ```bash
  npm test
  ```

* **Chạy từng Test Case theo tag:**
  ```bash
  npm run test:tc12   # Test Case 12: Thêm sản phẩm vào giỏ hàng
  npm run test:tc13   # Test Case 13: Xác minh số lượng sản phẩm
  npm run test:tc14   # Test Case 14: Đặt hàng - Đăng ký lúc Checkout
  npm run test:tc15   # Test Case 15: Đặt hàng - Đăng ký trước Checkout
  npm run test:tc16   # Test Case 16: Đặt hàng - Đăng nhập trước Checkout
  npm run test:tc20   # Test Case 20: Tìm kiếm sản phẩm & xác thực giỏ hàng sau khi Login
  npm run test:tc23   # Test Case 23: Xác thực thông tin địa chỉ tại trang Checkout
  npm run test:tc25   # Test Case 25: Cuộn trang lên/xuống sử dụng nút mũi tên 'Arrow'
  ```

### 2. Chạy với Playwright Spec Runner

```bash
npm run test:playwright
```

---

## 📊 Báo cáo kết quả kiểm thử

* **Cucumber Report:** Mở file `test-results/cucumber-report.html` trong trình duyệt.
* **Playwright Report:** Chạy lệnh:
  ```bash
  npx playwright show-report
  ```
