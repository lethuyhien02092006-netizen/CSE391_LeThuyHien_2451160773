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