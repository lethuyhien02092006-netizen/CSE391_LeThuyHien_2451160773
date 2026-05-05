# Phần A: Đọc hiểu
## Câu A1: Input Types
1. type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký. Use case: người dùng đăng nhập tài khoản
2. type="password" → Ô nhập văn bản nhưng các ký tự bị ẩn đi thay bằng dấu chấm hoặc sao. Validation định dạng minlength, pattern. Use case: Khách hàng nhập mật khẩu tài khoản hoặc mã PIN thanh toán
3. type="number" → Ô nhập chỉ cho phép số, thường có nút mũi tên tăng/giảm ở góc. Tự động chặn các ký tự chữ cái và kiểm tra giới hạn min, max hay step. Use case: Chọn số lượng sản phẩm muốn thêm vào giỏ hàng
4. type="tel" → Ô nhập văn bản hiển thị bàn phím số trên thiết bị di động. Không tự động kiểm tra định dạng thường kết hợp thuộc tính pattern. Use case: Nhập số điện thoại để nhân viên giao hàng liên hệ
5. type="date" → Hiển thị giao diện chọn lịch (DatePicker) trực quan. Tự động ép kiểu dữ liệu về định dạng YYYY-MM-DD. Use case: Khách hàng nhập ngày sinh để nhận ưu đãi thành viên.
6. type="color" → Hộp thoại chọn màu (Color Picker) từ bảng màu của hệ điều hành. Trả về giá trị mã màu Hex (ví dụ: #ff0000). Use case: Cho phép khách hàng tùy chỉnh màu sắc của sản phẩm để in
7. type="range" → Thanh trượt (slider) cho phép chọn một giá trị trong khoảng xác định. validation là min max, step . Use case: Bộ lọc tìm kiếm sản phẩm theo khoảng giá
8. type="file" → Nút bấm mở cửa sổ chọn tệp tin từ máy tính hoặc điện thoại. Có thể giới hạn loại tệp bằng thuộc tính accept (ví dụ: .jpg, .png) hoặc multible. Use case: Khách hàng tải ảnh chụp hóa đơn chuyển khoản
9. type="search" → Ô nhập văn bản có thêm nút "X" để xóa nhanh nội dung đã nhập. Tối ưu về hành vi trên các trình duyệt hiện đại. Use case: Thanh tìm kiếm sản phẩm trên đầu trang
10. type="url" → Ô nhập văn bản tối ưu bàn phím với các ký tự như /, .com. Tự động kiểm tra xem nội dung có đúng cấu trúc đường dẫn (phải có http:// hoặc https://). Use case: Yêu cầu người bán nhập link shop Shopee cá nhân để đối soát dữ liệu affiliate.

## Câu A2: Validation Attributes
- Trường hợp 1
`<input type="text" required value="">`
    - Kết quả: trình duyệt sẽ không duyệt form và thông báo lỗi
    - Lý do: thuộc tính `required` sẽ yêu cầu không được để trống, bắt buộc nhập. Khi giá trị là một chuỗi rỗng (""), trạng thái valid của input sẽ là false

- Trường hợp 2
`<input type="email" value="abc">`
    - Kêt quả: trình duyệt chặn gửi form, yêu cầu nhập đúng định dạng email
    - Lý do: `type="email"` yêu cầu dữ liệu phải khớp với tiêu chuẩn email. Chuỗi `"abc"` thiếu ký tự @ và tên miền nên bị coi là không hợp lệ

- Trường hợp 3
`<input type="number" min="1" max="10" value="15">`
    - Kết quả: trình duyệt chặn gửi form và thông báo giá trị phải nhỏ hơn bằng 10 và lớn hơn bằng 1
    - Lý do: thuộc tính `max="10"` thiết lập giới hạn trên cho dữ liệu. Vì giá trị 15 vượt quá giới hạn này nên input bị vi phạm

- Trường hợp 4
`<input type="text" pattern="[0-9]{10}" value="abc123">`
    - Kết quả: trình duyệt chặn gửi form và yêu cầu dữ liệu phải khớp với định dạng
    - Lý do: thuộc tính `pattern` sử dụng biểu thức chính quy để kiểm tra. Ở đây `[0-9]{10}` yêu cầu chính xác 10 chữ số. Chuỗi "abc123" vừa chứa chữ cái, vừa không đủ độ dài nên bị từ chối

- Trường hợp 5
`<input type="password" minlength="8" value="123">`
    - Kết quả: trình duyệt chặn gửi form, yêu cầu độ dài tối thiểu là 8 kí tự
    - Lý do: thuộc tính `minlength="8"` yêu cầu số lượng ký tự tối thiểu. Chuỗi "123" chỉ có 3 ký tự, vi phạm ràng buộc về độ dài tối thiểu của HTML5

Sau khi tạo file validation_test.html thì thực tế kết quả như đã dự đoán ở bên trên.

## Câu A3

