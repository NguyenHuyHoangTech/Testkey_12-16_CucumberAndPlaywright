# AutomationPractical - Cucumber + Playwright + TypeScript

Dự án Automation Testing hoàn chỉnh sử dụng **Playwright**, **Cucumber (BDD)** và **TypeScript** cho website thương mại điện tử [Automation Exercise](https://automationexercise.com/).

Dự án áp dụng mô hình **Page Object Model (POM)** chuẩn mực, phân tách rõ ràng giữa kịch bản nghiệp vụ (Gherkin Feature), định nghĩa các bước (Step Definitions) và tầng thao tác giao diện (Page Objects).

---

## 📋 Bảng Đối Chiếu Test Case (Test Case Mapping Matrix)

Dự án bao gồm đầy đủ **9 kịch bản kiểm thử** tự động hóa từ cơ bản đến nâng cao:

| STT | Mã Tag | Tên Test Case | Mô tả nghiệp vụ | File Feature |
|:---:|:---:|---|---|---|
| **1** | `@login` | **User Login** | Xác thực đăng nhập người dùng hợp lệ, kiểm tra trạng thái và dọn dẹp tài khoản | `features/login.feature` |
| **2** | `@tc12` | **Test Case 12** | Thêm 2 sản phẩm vào giỏ hàng và xác thực tên, đơn giá, số lượng, tổng tiền | `features/tc12_add_products_in_cart.feature` |
| **3** | `@tc13` | **Test Case 13** | Tăng số lượng sản phẩm (quantity = 4) tại trang chi tiết và xác thực trong giỏ | `features/tc13_verify_product_quantity.feature` |
| **4** | `@tc14` | **Test Case 14** | Đặt hàng thành công: Đăng ký tài khoản trong quá trình thanh toán (Register while Checkout) | `features/tc14_place_order_register_while_checkout.feature` |
| **5** | `@tc15` | **Test Case 15** | Đặt hàng thành công: Đăng ký tài khoản trước khi thanh toán (Register before Checkout) | `features/tc15_place_order_register_before_checkout.feature` |
| **6** | `@tc16` | **Test Case 16** | Đặt hàng thành công: Đăng nhập tài khoản trước khi thanh toán (Login before Checkout) | `features/tc16_place_order_login_before_checkout.feature` |
| **7** | `@tc20` | **Test Case 20** | Tìm kiếm sản phẩm, thêm vào giỏ, đăng nhập và xác thực giỏ hàng được bảo lưu | `features/tc20_search_products_verify_cart_after_login.feature` |
| **8** | `@tc23` | **Test Case 23** | Xác thực chi tiết địa chỉ giao hàng (Delivery) và thanh toán (Billing) tại trang Checkout | `features/tc23_verify_address_details_in_checkout.feature` |
| **9** | `@tc25` | **Test Case 25** | Cuộn trang xuống cuối xác nhận Subscription và bấm nút mũi tên 'Arrow' cuộn lên đầu trang | `features/tc25_verify_scroll_up_using_arrow_button.feature` |

---

## 📁 Cấu trúc thư mục dự án

```text
AutomationPractical/
├── .github/
│   └── workflows/
│       └── tests.yml             # GitHub Actions CI workflow tự động chạy test
├── features/                     # Thư mục kịch bản BDD (Gherkin)
│   ├── login.feature
│   ├── tc12_add_products_in_cart.feature
│   ├── tc13_verify_product_quantity.feature
│   ├── tc14_place_order_register_while_checkout.feature
│   ├── tc15_place_order_register_before_checkout.feature
│   ├── tc16_place_order_login_before_checkout.feature
│   ├── tc20_search_products_verify_cart_after_login.feature
│   ├── tc23_verify_address_details_in_checkout.feature
│   └── tc25_verify_scroll_up_using_arrow_button.feature
├── pages/                        # Page Object Model (POM)
│   ├── BasePage.ts               # Lớp cơ sở chứa hàm dùng chung (navigate, click, wait)
│   ├── LoginPage.ts              # Page Object trang Đăng nhập / Đăng ký
│   ├── HomePage.ts               # Page Object trang chủ
│   ├── ProductsPage.ts           # Page Object danh sách sản phẩm & tìm kiếm
│   ├── ProductDetailPage.ts      # Page Object trang chi tiết sản phẩm
│   ├── CartPage.ts               # Page Object giỏ hàng & modal checkout
│   ├── CheckoutPage.ts           # Page Object kiểm tra địa chỉ & đặt hàng
│   └── PaymentPage.ts            # Page Object nhập thông tin thanh toán thẻ
├── steps/                        # Step Definitions (liên kết Cucumber Gherkin và code)
│   ├── hooks.ts
│   ├── login.steps.ts
│   ├── products.steps.ts
│   └── checkout.steps.ts
├── support/                      # Cấu hình Cucumber World & Hooks
│   ├── hooks.ts                  # Khởi tạo browser, context, route filter và chụp ảnh khi lỗi
│   └── world.ts                  # Định nghĩa CustomWorld chứa page, browser, context
├── tests/
│   └── example.spec.ts           # Test spec chạy với Playwright Test Runner thuần
├── playwright-report/            # Báo cáo kết quả Playwright HTML
│   └── index.html
├── test-results/                 # Báo cáo kết quả Cucumber HTML & JSON
│   ├── .last-run.json
│   ├── cucumber-report.html      # Báo cáo Cucumber trực quan đầy đủ
│   └── cucumber-report.json
├── .env                          # Biến môi trường cấu hình (BASE_URL, BROWSER, HEADLESS)
├── .gitignore                    # Cấu hình bỏ qua các file rác và dependencies
├── cucumber.js                   # Cấu hình Cucumber runner
├── package.json                  # Cấu hình dependencies & scripts
├── playwright.config.ts          # Cấu hình Playwright test runner
├── README.md                     # Tài liệu hướng dẫn dự án
└── tsconfig.json                 # Cấu hình TypeScript compiler
```

---

## 🚀 Cài đặt & Khởi tạo

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Cài đặt trình duyệt Playwright:**
   ```bash
   npx playwright install chromium
   ```

---

## 🧪 Hướng dẫn Chạy Kiểm Thử

### 1. Chạy toàn bộ 9 kịch bản Cucumber BDD:
```bash
npm test
```

### 2. Chạy riêng từng Test Case theo tag:
```bash
npm run test:login   # Kịch bản Login
npm run test:tc12    # Test Case 12: Thêm sản phẩm vào giỏ hàng
npm run test:tc13    # Test Case 13: Xác minh số lượng sản phẩm
npm run test:tc14    # Test Case 14: Đặt hàng - Đăng ký lúc Checkout
npm run test:tc15    # Test Case 15: Đặt hàng - Đăng ký trước Checkout
npm run test:tc16    # Test Case 16: Đặt hàng - Đăng nhập trước Checkout
npm run test:tc20    # Test Case 20: Tìm kiếm sản phẩm & xác thực giỏ hàng sau Login
npm run test:tc23    # Test Case 23: Xác thực địa chỉ tại trang Checkout
npm run test:tc25    # Test Case 25: Cuộn trang lên/xuống sử dụng nút mũi tên 'Arrow'
```

### 3. Chạy Playwright Spec:
```bash
npm run test:playwright
```

---

## 📊 Xem Báo Cáo Kết Quả Kiểm Thử

- **Mở nhanh báo cáo Cucumber HTML (Windows):**
  ```bash
  npm run report
  ```
  *(Hoặc mở trực tiếp file `test-results/cucumber-report.html` trong bất kỳ trình duyệt nào)*

- **Mở báo cáo Playwright Test:**
  ```bash
  npx playwright show-report
  ```

---

## 🔄 Tích Hợp CI/CD (GitHub Actions)

Dự án đã được thiết lập workflow CI tự động tại `.github/workflows/tests.yml`:
- Tự động kích hoạt khi có commit mới hoặc tạo pull request vào nhánh `main`.
- Chạy toàn bộ test suite trên môi trường Ubuntu Linux (Headless Mode, tự động dọn dẹp và gắn thẻ).
- Tự động xuất và lưu trữ Artifacts (`test-results/`, `playwright-report/`).
