## PHẦN A — ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — Grid System

#### 1. Vẽ layout cho mã nguồn HTML dưới đây ở 3 kích thước:
Mã nguồn:
```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

Bảng phân tích bố cục lưới (Grid Layout) theo kích thước màn hình:

| Kích thước | `< 768px` (Extra Small / Small) | `768px - 991px` (Medium) | `≥ 992px` (Large / Extra Large / ...) |
| :--- | :--- | :--- | :--- |
| **Số cột hiển thị trên 1 hàng** | **1 cột** | **2 cột** | **4 cột** |
| **Box layout (Phác thảo cấu trúc)** | `[Box 1]` (chiếm 100% width)<br>`[Box 2]` (chiếm 100% width)<br>`[Box 3]` (chiếm 100% width)<br>`[Box 4]` (chiếm 100% width)<br>*(Xếp chồng theo chiều dọc)* | `[Box 1]` (50%) \| `[Box 2]` (50%)<br>`[Box 3]` (50%) \| `[Box 4]` (50%)<br>*(Bố cục lưới 2 dòng x 2 cột)* | `[Box 1]` (25%) \| `[Box 2]` (25%) \| `[Box 3]` (25%) \| `[Box 4]` (25%)<br>*(Xếp thẳng hàng ngang trên 1 dòng)* |

#### 2. Trả lời câu hỏi phụ:
*   **`col-md-6` nghĩa là gì?**
    *   `col-md-6` là một class quy định kích thước cột trên lưới của Bootstrap.
    *   Ý nghĩa: Khi kích thước màn hình thiết bị có chiều rộng từ breakpoint **Medium** (`md` - tức là từ `768px`) trở lên, phần tử đó sẽ chiếm **6 trên tổng số 12 phần** (tương đương **50%**) chiều rộng của hàng chứa nó (`.row`).
*   **Tại sao không cần viết `col-sm-12`?**
    *   Bootstrap được thiết kế theo triết lý **Mobile-first** (ưu tiên di động trước tiên). Nghĩa là các class grid mặc định không có tiền tố breakpoint (như `col-12`) sẽ áp dụng từ màn hình nhỏ nhất (`xs` `< 576px`) trở lên và tự động kế thừa/lan rộng lên tất cả các kích thước lớn hơn tiếp theo (`sm`, `md`, `lg`, `xl`, v.v.) trừ khi bị ghi đè bởi một breakpoint lớn hơn.
    *   Trong đoạn code trên, ta đã khai báo class `col-12`. Class này tự động áp dụng cho cả breakpoint `sm` ($576\text{px} - 767\text{px}$), làm cho mỗi box chiếm trọn 12/12 cột (100%). Vì vậy việc khai báo thêm class `col-sm-12` là hoàn toàn dư thừa và không cần thiết.

---

### Câu A2 (10đ) — Utilities & Components

#### 1. Giải thích class `d-none d-md-block`. Element này hiển thị khi nào, ẩn khi nào?
*   `d-none`: Thiết lập thuộc tính `display: none !important` trên toàn bộ các kích thước màn hình bắt đầu từ nhỏ nhất.
*   `d-md-block`: Thiết lập thuộc tính `display: block !important` bắt đầu từ breakpoint màn hình Medium (`md` $\ge 768\text{px}$) trở lên.
*   **Kết luận hiển thị / ẩn**:
    *   **Ẩn**: Element này sẽ bị ẩn hoàn toàn (không kết xuất trong dòng chảy trang) khi màn hình có kích thước **nhỏ hơn 768px** (`< 768px`).
    *   **Hiển thị**: Element này sẽ hiển thị dưới dạng khối (`block`) khi màn hình có kích thước **từ 768px trở lên** (`≥ 768px`).

#### 2. Liệt kê 5 spacing utilities (margin/padding) và giải thích:
1.  `mt-3`:
    *   *Ý nghĩa*: Thiết lập lề trên (`margin-top`).
    *   *Giải thích*: Cấp độ số `3` tương đương với khoảng cách bằng biến `$spacer` trong thiết lập mặc định của Bootstrap (thường là `1rem` = `16px`).
2.  `px-4`:
    *   *Ý nghĩa*: Thiết lập đệm hai bên trái và phải cùng lúc (`padding-left` và `padding-right` trên trục X).
    *   *Giải thích*: Cấp độ số `4` tương đương với khoảng cách bằng `$spacer * 1.5` (mặc định là `1.5rem` = `24px`).
3.  `mb-auto`:
    *   *Ý nghĩa*: Thiết lập lề dưới tự động (`margin-bottom: auto`).
    *   *Giải thích*: Thường được sử dụng trong các layout Flexbox để đẩy các phần tử khác dọc trục hoặc căn chỉnh các phần tử cuối cùng xuống đáy khối.
4.  `py-2`:
    *   *Ý nghĩa*: Thiết lập đệm cả trên và dưới cùng lúc (`padding-top` và `padding-bottom` trên trục Y).
    *   *Giải thích*: Cấp độ số `2` tương đương với khoảng cách bằng `$spacer * 0.5` (mặc định là `0.5rem` = `8px`).
5.  `ms-5`:
    *   *Ý nghĩa*: Thiết lập lề bắt đầu (`margin-start`), tương ứng với lề bên trái (`margin-left`) trong giao diện đọc từ trái qua phải (LTR).
    *   *Giải thích*: Cấp độ số `5` tương đương với khoảng cách bằng `$spacer * 3` (mặc định là `3rem` = `48px`).

#### 3. Sự khác nhau giữa `.container`, `.container-fluid`, và `.container-md`:
*   `.container`:
    *   Là container responsive có chiều rộng tối đa thay đổi cố định (fixed max-width) theo từng mốc breakpoint của Bootstrap.
    *   Nó sẽ tự động căn giữa (`margin-left: auto; margin-right: auto;`) và thêm padding hai bên để giữ nội dung không bị dính sát lề. Chiều rộng tối đa của nó tăng dần tương ứng: 540px ($\ge 576px$), 720px ($\ge 768px$), 960px ($\ge 992px$), 1140px ($\ge 1200px$), 1320px ($\ge 1400px$).
*   `.container-fluid`:
    *   Là container dạng chất lỏng (fluid container), chiều rộng luôn bao phủ toàn bộ **100% viewport** ở mọi breakpoint màn hình (từ màn hình cực nhỏ đến màn hình cực lớn).
*   `.container-md`:
    *   Là sự kết hợp linh hoạt. Ở các kích thước màn hình nhỏ hơn breakpoint Medium (`< 768px`), nó hoạt động như `.container-fluid` (chiếm 100% chiều rộng).
    *   Bắt đầu từ breakpoint `md` trở lên ($\ge 768px$), nó sẽ tự chuyển đổi sang cơ chế hoạt động giống hệt như `.container` thông thường (áp dụng responsive fixed max-width).

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Tùy biến Bootstrap

#### 1. Quy trình đổi màu `$primary` từ xanh mặc định sang `#E63946`:
Để đổi màu chủ đạo hệ thống mà không phá vỡ cấu trúc và tính nhất quán của Bootstrap, ta phải tùy biến thông qua ngôn ngữ tiền xử lý **SASS**.
*   **Các công cụ cần chuẩn bị**:
    1.  **Node.js & npm**: Môi trường chạy và quản lý thư viện.
    2.  **SASS Compiler**: Bộ biên dịch để chuyển đổi mã SASS/SCSS sang file CSS thông thường. Có thể cài đặt thông qua npm.
*   **Quy trình thực hiện**:
    1.  **Cài đặt các gói**: Khởi tạo project (nếu chưa có) và cài đặt Bootstrap cùng trình biên dịch sass:
        ```bash
        npm init -y
        npm install bootstrap
        npm install -D sass
        ```
    2.  **Tạo file SCSS làm việc**: Tạo một file SCSS mới, ví dụ `scss/custom.scss`.
    3.  **Khai báo ghi đè màu sắc**:
        ```scss
        // scss/custom.scss
        
        // Bước 1: Import các hàm cấu trúc của Bootstrap
        @import "../node_modules/bootstrap/scss/functions";
        
        // Bước 2: Thiết lập biến màu $primary tùy chỉnh trước khi import các file variables chính
        $primary: #E63946;
        
        // Bước 3: Import toàn bộ thư viện Bootstrap còn lại
        @import "../node_modules/bootstrap/scss/variables";
        @import "../node_modules/bootstrap/scss/variables-dark";
        @import "../node_modules/bootstrap/scss/maps";
        @import "../node_modules/bootstrap/scss/mixins";
        @import "../node_modules/bootstrap/scss/utilities";
        @import "../node_modules/bootstrap/scss/bootstrap"; // Hoặc import tất cả bằng dòng này
        ```
    4.  **Biên dịch mã (Compile SASS)**: Chạy lệnh biên dịch SASS qua terminal để sinh ra file CSS:
        ```bash
        npx sass scss/custom.scss dist/css/custom.css
        ```
    5.  **Nhúng vào HTML**: Link file `custom.css` vào trang web thay thế cho file Bootstrap gốc từ CDN.

#### 2. Tại sao KHÔNG nên ghi đè trực tiếp `.btn-primary { background: red; }` mà nên dùng SASS variables?
Việc ghi đè trực tiếp thông qua CSS thuần mang lại nhiều điểm bất lợi và là một bad practice vì:
1.  **Mất đồng bộ hệ thống**: Class `.btn-primary` chỉ là một trong hàng chục thành phần sử dụng màu `$primary`. Nếu ghi đè thủ công, các thành phần khác như text màu primary (`.text-primary`), nền (`.bg-primary`), viền (`.border-primary`), huy hiệu (`.badge`), các thanh điều hướng (`.nav-pills`), và input khi focus vẫn sẽ giữ màu xanh mặc định ban đầu. Bạn sẽ phải viết hàng trăm dòng CSS phụ để chỉnh tay từng class một.
2.  **Mất các hiệu ứng trạng thái**: Một nút bấm chuẩn cần có các trạng thái tương tác như hover (di chuột), active (ấn giữ), focus (tiêu điểm), và disabled (vô hiệu hóa). Khi đổi màu trực tiếp thông qua class gốc bằng CSS, các hiệu ứng hover hay active vẫn có thể bị giữ nguyên hoặc bị lỗi màu nếu không được chỉ định chi tiết bằng cách tính toán sắc độ (như tối đi 10% khi hover). SASS sẽ tự động tính toán và sinh ra đầy đủ các sắc độ biến đổi này cho bạn.
3.  **Khó bảo trì**: Khi hệ thống mở rộng hoặc thay đổi màu thương hiệu một lần nữa, việc tìm và sửa các đoạn ghi đè thủ công vô cùng tốn công và dễ xảy ra sai sót sót, trong khi dùng SASS ta chỉ cần sửa đúng 1 giá trị của biến `$primary`.

---

### Câu C2 (10đ) — So sánh

#### 1. Ví dụ mã CSS thuần tạo một Responsive Navbar và một Product Card:

##### Mã CSS cho Responsive Navbar:
```css
/* RESET & COMMON STYLES */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, sans-serif;
}

/* NAVBAR BASE STYLES */
.custom-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 15px 30px;
  color: #fff;
  position: relative;
}
.navbar-logo {
  font-size: 20px;
  font-weight: bold;
}
.navbar-links {
  display: flex;
  list-style: none;
}
.navbar-links li {
  margin-left: 20px;
}
.navbar-links a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}
.navbar-links a:hover {
  color: #E63946;
}
.navbar-toggle-btn {
  display: none;
  cursor: pointer;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
}

/* RESPONSIVE MEDIA QUERY */
@media (max-width: 768px) {
  .navbar-toggle-btn {
    display: block;
  }
  .navbar-links {
    display: none;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #333;
    padding: 20px 0;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  .navbar-links.show {
    display: flex;
  }
  .navbar-links li {
    margin: 10px 0;
    text-align: center;
  }
}
```

##### Mã CSS cho Product Card & Layout Grid:
```css
/* PRODUCT GRID LAYOUT */
.product-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 15px;
}
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 576px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* CARD DETAILS */
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #fff;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.product-card-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}
.product-card-body {
  padding: 15px;
}
.product-card-title {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
}
.product-card-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
}
.product-badge-sale {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #E63946;
  color: #fff;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
}
```

#### 2. Bảng so sánh giữa CSS thuần và Bootstrap:

| Tiêu chí | CSS Thuần (Raw CSS) | Phiên bản Bootstrap (Bootstrap CSS/JS) |
| :--- | :--- | :--- |
| **Số dòng CSS cần viết** | Rất lớn (khoảng 100 - 150 dòng cho các thành phần cơ bản và media queries trên). | Gần như **0 dòng** CSS tùy chỉnh (nếu dùng các class tiện ích có sẵn của Bootstrap). |
| **Thời gian phát triển** | **Chậm**. Phải tự tính toán kích thước, viết các breakpoints bằng media query thủ công, tự kiểm thử trên nhiều thiết bị và viết thêm JS hỗ trợ tương tác (như bật/tắt navbar menu). | **Rất nhanh**. Chỉ cần ghép các class dựng sẵn thích hợp vào HTML (`d-flex`, `card`, `col-lg-3`, v.v.), JavaScript tương tác cũng được Bootstrap xử lý qua thuộc tính `data-bs-*`. |
| **Khả năng tùy biến** | **Cao tuyệt đối**. Lập trình viên có toàn quyền kiểm soát từng thuộc tính, đơn vị, và các hiệu ứng đặc biệt mà không lo bị ràng buộc hay xung đột quy chuẩn. | **Trung bình - Khá**. Nếu chỉ dùng CSS thông thường sẽ rất khó tùy biến sâu các thành phần. Muốn tùy biến cao, đòi hỏi phải can thiệp cấu trúc qua SASS hoặc ghi đè class khá phức tạp. |

#### 3. Khi nào NÊN và KHÔNG NÊN sử dụng Bootstrap?

*   **NÊN sử dụng Bootstrap khi**:
    *   **Cần phát triển nhanh (Rapid Prototyping)**: Các dự án cần hoàn thiện giao diện demo, MVP (sản phẩm khả dụng tối thiểu) hoặc các trang quản trị admin dashboard trong thời gian ngắn nhất.
    *   **Đồng nhất và Chuẩn hóa**: Làm việc trong các nhóm có nhiều thành viên, Bootstrap cung cấp bộ quy chuẩn đồng bộ giúp code dễ đọc và dễ chuyển giao.
    *   **Thiếu chuyên gia Frontend**: Khi backend developers cần xây dựng giao diện hoàn chỉnh có độ phản hồi (responsive) tốt và chuyên nghiệp mà không mất thời gian nghiên cứu thiết kế CSS sâu sắc.
*   **KHÔNG NÊN sử dụng Bootstrap khi**:
    *   **Dự án yêu cầu thiết kế độc bản (Custom Creative Designs)**: Các website nghệ thuật, chiến dịch marketing sáng tạo mang tính nhận diện thương hiệu cao, bố cục phi chuẩn. Việc ép khung Bootstrap sẽ gây tốn nhiều thời gian phá cấu trúc hơn tự viết.
    *   **Tối ưu hóa hiệu năng cực hạn (Performance Optimization)**: Các trang đích siêu nhẹ cần tối ưu tốc độ tải trang đến từng mili-giây. Bộ thư viện Bootstrap (bao gồm cả CSS và JS) có dung lượng khá lớn, chứa nhiều class dư thừa không sử dụng đến.
    *   **Sản phẩm có cấu trúc giao diện rất đơn giản**: Chỉ cần 1-2 trang đơn thuần, việc import cả thư viện đồ sộ vào sẽ làm tăng tài nguyên không cần thiết.
