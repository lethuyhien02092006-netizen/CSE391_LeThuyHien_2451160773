# Phần A: Đọc hiểu
`Tài liệu tham chiếu: tuan_3_css_advanced/13_creating_responsive_layouts.md → 16_sass_scss.md`
## Câu A1: Viewport & Mobile-First
1. Thẻ `<meta viewport>` chuẩn: 
  `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    - `name="viewport"`: Khai báo cho trình duyệt biết thẻ meta này dùng để cấu hình vùng hiển thị (viewport) của trang web trên các thiết bị
    - `width=device-width`: Định nghĩa chiều rộng của viewport. Giá trị device-width yêu cầu trình duyệt đặt chiều rộng của trang web khớp chính xác với chiều rộng màn hình thực tế của thiết bị
    - `initial-scale=1.0`: Đặt mức độ thu phóng ban đầu khi trang web vừa tải xong. Giá trị 1.0 nghĩa là trang web hiển thị đúng tỉ lệ 1:1, không tự động phóng to hay thu nhỏ
2. Nếu thiếu thẻ này = iPhone sẽ coi trang web là web desktop và thu nhỏ xíu lại. Luôn đặt trong `<head>`
3. 
- Mobile-First (Ưu tiên di động): Bạn viết CSS cho màn hình nhỏ (Mobile) trước như một layout mặc định. Sau đó, bạn dùng các truy vấn Media Queries để thêm hoặc ghi đè các thuộc tính CSS nhằm mở rộng giao diện cho màn hình lớn hơn (Tablet, Desktop). Cách này dùng toán tử min-width
- Desktop-First (Ưu tiên máy tính): Ngược lại hoàn toàn. Bạn viết CSS cho màn hình lớn (Desktop) làm mặc định. Sau đó, bạn dùng Media Queries để thu gọn, ẩn bớt hoặc điều chỉnh lại bố cục cho phù hợp với màn hình nhỏ dần. Cách này dùng toán tử max-width
- Cách 1: Mobile-First:
```
/* CSS mặc định cho Mobile (dưới 768px) */
.container {
    width: 100%;
    padding: 10px;
}
.sidebar {
    display: none; /* Mobile ẩn sidebar cho đỡ chật */
}

@media (min-width: 768px) {
    .container {
        width: 80%; /* Màn hình lớn thì thu hẹp vùng chứa lại */
        margin: 0 auto;
    }
    .sidebar {
        display: block; /* Màn hình lớn thì hiện sidebar ra */
    }
}
```
- Cách 2: Desktop-First
```
/* CSS mặc định cho Desktop (Màn hình lớn) */
.container {
    width: 80%;
    margin: 0 auto;
}
.sidebar {
    display: block;
}
@media (max-width: 767.98px) {
    .container {
        width: 100%;
        padding: 10px;
    }
    .sidebar {
        display: none; /* Thu nhỏ xuống thì ẩn sidebar đi */
    }
}
```
- Mobile-First hiện là tiêu chuẩn vàng trong thiết kế web hiện đại nhờ 3 lý do cốt lõi sau:
    - Tối ưu hiệu năng (Performance): Thiết bị di động thường có cấu hình yếu hơn và kết nối 3G/4G/5G kém ổn định hơn máy tính. Viết CSS Mobile-First giúp trình duyệt di động đọc các đoạn code đơn giản, gọn nhẹ ngay từ đầu mà không cần phải xử lý hay ghi đè các bộ quy tắc CSS phức tạp của bản Desktop.
    - Tư duy thiết kế tinh gọn (Content Prioritization): Khi thiết kế cho màn hình di động chật hẹp trước, các nhà phát triển và thiết kế bắt buộc phải tập trung vào những thứ thực sự quan trọng: Nội dung cốt lõi là gì? Tính năng nào là cần thiết nhất? Điều này giúp loại bỏ các chi tiết thừa thãi, rườm rà.
    - Tốt cho SEO (Google Mobile-First Indexing): Từ lâu, Google đã áp dụng thuật toán ưu tiên lập chỉ mục di động. Google sẽ quét và đánh giá phiên bản mobile của trang web để xếp hạng trên công cụ tìm kiếm. Một trang web tiếp cận theo hướng Mobile-First sẽ có lợi thế rất lớn về tốc độ và trải nghiệm người dùng trên di động, từ đó đạt thứ hạng cao hơn.

## Câu A2: Breakpoints
- Breakpoints chuẩn (Bootstrap):

| Tên | Kích thước | Thiết bị đại diện |
| :--- | :--- | :--- |
| **xs** | < 576px | Điện thoại dọc |
| **sm** | ≥ 576px | Điện thoại ngang |
| **md** | ≥ 768px | Tablet |
| **lg** | ≥ 992px | Desktop nhỏ |
| **xl** | ≥ 1200px | Desktop lớn |

## Câu A3: Media Queries
```
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

| Chiều rộng màn hình | .container width |
| :--- | :--- |
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

## Câu A4: SCSS Basics
- 4 tính năng chính của SCSS:
  - Variables:
```
    $primary-color: #3498db;
    $font-stack: Helvetica, sans-serif;

    body {
    color: $primary-color;
    font-family: $font-stack;
    }
```

  - Nesting
```
nav {
  ul {
    margin: 0;
    li { display: inline-block; }
  }
  a { color: blue; }
}
```

  - Mixins:
``` 
@mixin flex-center($direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}

.box { @include flex-center(column); }
```
  - @extend / Inheritance
```
.message {
  border: 1px solid #ccc;
  padding: 10px;
}

.success {
  @extend .message;
  border-color: green;
}
```

# Phần B: Thực hành

## Bài B1 — Responsive Product Page
*   **Trang HTML:** [responsive.html](file:///d:/NTPT_WEB/PBT_05/responsive.html)
*   **Trang CSS:** [responsive.css](file:///d:/NTPT_WEB/PBT_05/responsive.css)
*   **Tính năng chính:**
    *   **Mobile-First Design**: CSS được viết mặc định cho Mobile (< 768px). Toàn bộ layout dạng 1 cột, các khu vực Sidebar (bộ lọc) và Ads Bar (quảng cáo) được ẩn đi để tối ưu diện tích. Header sử dụng nút menu hamburger và có kịch bản toggle hiển thị khi nhấn.
    *   **Tablet View (768px - 1023px)**: Sử dụng `@media (min-width: 768px)`. Grid sản phẩm chia làm 2 cột. Thanh sidebar (bộ lọc) chuyển thành hàng ngang nằm phía trên grid sản phẩm với các bộ lọc đặt cạnh nhau.
    *   **Desktop View (≥ 1024px)**: Sử dụng `@media (min-width: 1024px)`. Giao diện chia thành 3 cột hoàn chỉnh: cột trái là bộ lọc dọc (Sidebar - 240px), cột giữa là lưới sản phẩm chia thành 4 cột, cột phải là bảng tin khuyến mãi/quảng cáo (Ads Bar - 200px).
    *   **Ảnh & Font responsive**: Ảnh sản phẩm tự co giãn theo container (`max-width: 100%; height: auto;`). Kích thước font chữ của toàn trang thay đổi linh hoạt theo breakpoint (Mobile: 14px, Tablet: 15px, Desktop: 16px).

## Bài B2 — CSS Transitions & Animations
*   **Trang HTML:** [animations.html](file:///d:/NTPT_WEB/PBT_05/animations.html)
*   **Trang CSS:** [animations.css](file:///d:/NTPT_WEB/PBT_05/animations.css)
*   **Chi tiết 5 hiệu ứng bắt buộc:**
    1.  **Card hover effect**: Khi hover vào card, phần tử sẽ trượt nhẹ lên trên `transform: translateY(-8px)` kết hợp tăng độ mờ rộng của `box-shadow` bằng hiệu ứng `transition: all 0.3s ease`.
    2.  **Button hover**: Nút "Mua ngay" chuyển đổi màu sắc nền (`background-color`) và chữ mượt mà, đồng thời phóng to nhẹ với `transform: scale(1.05)`.
    3.  **Image zoom**: Ảnh sản phẩm phóng to `transform: scale(1.1)` khi hover mà không bị tràn ra ngoài nhờ thuộc tính `overflow: hidden` cài đặt trên container bao ngoài ảnh (`.img-wrapper`).
    4.  **Loading spinner**: Tạo vòng xoay loading vô hạn từ một thẻ `div` hình tròn rỗng bằng `@keyframes spin` xoay từ `0deg` đến `360deg` liên tục (`animation: spin 1s linear infinite`).
    5.  **Fade-in on load (CSS Only)**: Hiệu ứng xuất hiện mượt mà cho các phần tử lúc tải trang bằng `@keyframes fadeIn` chuyển trạng thái từ ẩn và lệch dưới (`opacity: 0; transform: translateY(20px)`) thành hiện và về vị trí gốc (`opacity: 1; transform: translateY(0)`).

## Bài B3 — SCSS Refactor
Cấu trúc thư mục mã nguồn SCSS được tổ chức khoa học trong thư mục [scss](file:///d:/NTPT_WEB/PBT_05/scss):
```text
scss/
├── _variables.scss   # Chứa 12 biến màu sắc, font, spacing, radius, shadow và breakpoints
├── _mixins.scss      # Chứa 3 mixin (respond-to xử lý media queries, flex-center dựng flexbox, card-shadow đổ bóng)
├── _components.scss  # Chứa toàn bộ các khối giao diện (Header, Sidebar, Cards, Footer) sử dụng Nesting nâng cao
└── style.scss        # Điểm bắt đầu chính, import 3 file partials trên
```

### Lệnh biên dịch (Compile SASS/SCSS)
Do môi trường máy local cài đặt **Python 3.13** và không cài đặt NodeJS/npm, quá trình biên dịch được thực hiện qua thư viện `libsass` (môi trường C-binding chính thức của Sass cho Python).

1.  **Cài đặt thư viện biên dịch:**
    ```bash
    pip install libsass
    ```
2.  **Lệnh thực hiện biên dịch từ thư mục gốc dự án:**
    Thực thi file script biên dịch tự động [compile_sass.py](file:///d:/NTPT_WEB/PBT_05/compile_sass.py):
    ```bash
    python compile_sass.py
    ```
    *Hoặc nếu có NodeJS/npm cài đặt sẵn trên máy khác, lệnh biên dịch tiêu chuẩn sẽ là:*
    ```bash
    sass scss/style.scss style.css
    ```
    Sau khi biên dịch thành công, file [style.css](file:///d:/NTPT_WEB/PBT_05/style.css) sẽ tự động được tạo ra chứa đầy đủ các thuộc tính CSS mở rộng từ SCSS.

