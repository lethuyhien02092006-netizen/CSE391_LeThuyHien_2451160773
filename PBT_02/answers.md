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

## Câu A3: Accessibility
- Dùng `<lable for="email">` quan trọng cho người dùng screen reader vì trình đọc màn hình không nhìn thấy giao diện như chúng ta, nó đọc cấu trúc mã HTML nên khi dùng `for="email'` trên thẻ `<label>` sẽ tạo được mối liên kết logic
- Dùng `<fieldset>` + `<legend>` khi muốn nhóm các nhóm có liên quan chặt chẽ
    - Ví dụ: nếu chỉ hỏi "Bạn có đồng ý không?" người dùng screen reader sẽ không biết đang hỏi về điều gì
    <!-- Ví dụ: Nhóm câu hỏi trắc nghiệm -->
```<fieldset>
  <legend>Phương thức liên lạc ưu tiên</legend>
  
  <input type="radio" id="sms" name="contact" value="sms">
  <label for="sms">Tin nhắn SMS</label><br>

  <input type="radio" id="call" name="contact" value="phone">
  <label for="call">Gọi điện thoại</label>
</fieldset>
```
- `aria-label` dùng khi bạn muốn cung cấp một nhãn văn bản cho sceen reader nhưng không muốn hiển thị nhãn đó trên giao diện. Không nên dùng `aria-label` khi đã có `<label>` vì trong quy tắc vàng của Accessibility nếu dùng được HTML thuần thì cứ dùng vì nó ổn định và hỗ trợ tốt hơn

## Câu A4: Media
1. Thuộc tính `loading="lazy"` trên thẻ `<img>` giúp cải thiện tốc độ tải trang, tiết kiệm băng thông vì `loading="lazy"` là kỹ thuật giúp trình duyệt trì hoãn việc tải hình ảnh cho đến khi người dùng cuộn chuột đến gần vị trí ảnh đó. KHông nên dùng thuộc tính này cho ảnh ở đầu trang như logo hoặc ảnh bìa, không dùng cho những ảnh chính là nội dung cần hiển thị ưu tiên
2. Việc cung cấp nhiều `source` trong thẻ `<img>` giúp trình duyệt tự chọn định dạng tốt nhất mà nó hỗ trợ, đảm bảo video chạy được trên mọi thiết bị và tối ưu dung lượng. 3 format video web phổ biển: MP4, Ogg, WebM.
3. Thuộc tính `alt` trên thẻ `<img>` dùng để mô tả hình ảnh bằng văn bản khi ảnh bị lỗi. `alt` tốt cho 3 trường hợp:
   - Ảnh sản phẩm từ iphone16: `alt="Điện thoại iPhone 16 màu Hồng, dung lượng 128GB, nhìn từ mặt lưng"`
   - Ảnh trang trí: `alt=""`
   - Ảnh biểu đồ doanh thu: `alt="Biểu đồ cột cho thấy doanh thu Q1/2026 tăng 15% so với quý trước, đạt mức 50 tỷ đồng."`

## Câu A5: So sánh `<figure>` vs `<img>`
- Chọn `<img>` khi đó là hình ảnh không thể tách rời giao diện hoặc văn bản
- Chọn `<figure>` khi viết blog, báo trí, v.v muốn có chú thích hiển thị rõ ràng cho ảnh và khi muốn cải thiện SEO

# Phần B:
## Câu B1:
Tại sao HTML không thể tự validate "Confirm Password"?

Mặc dù HTML5 cung cấp các thuộc tính Validation mạnh mẽ như `required`, `pattern`, `minlength`, nhưng nó có một giới hạn quan trọng: HTML không thể so sánh giá trị giữa hai thẻ input khác nhau một cách logic

1. Thiếu tính logic so sánh: Các thuộc tính validation của HTML hoạt động độc lập trên từng phần tử (atomic validation). Thuộc tính `pattern` chỉ kiểm tra giá trị của chính nó so với một biểu thức chính quy (Regex), chứ không có cú pháp nào để nói "khớp với giá trị của ô có ID là 'password'".
2. Ngôn ngữ đánh dấu (Markup) vs Ngôn ngữ lập trình: HTML là ngôn ngữ đánh dấu cấu trúc. Việc kiểm tra tính khớp nhau (matching logic) là một nghiệp vụ logic (business logic), yêu cầu khả năng truy cập vào bộ nhớ/biến số để so sánh

# Phần C: phân tích và suy luận
## Câu C1:
- Lỗi 1: Dòng 2 — Input "Tên" không có `<label for="...">`, vi phạm accessibility
    - Sửa: `<label for="name">Tên:</label> <input type="text" id="name" name="name" required>`
- Lỗi 2: Dòng 4 — Input "Email" thiếu `<label>` chỉ sử dụng placeholder thay thế cho label là vi phạm accessibility vì placeholder biến mất khi người dùng gõ, gây khó khăn cho việc kiểm tra lại thông tin 
    - Sửa: `<label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>`
- Lỗi 3: Dòng 6 — Input "Mật khẩu" thiếu validation cơ bản, mật khẩu nên có các thuộc tính giới hạn độ dài để bảo mật và tránh lỗi từ phía server 
    - Sửa: `<label for="pwd">Mật khẩu:</label> <input type="password" id="pwd" name="pwd" minlength="8" required>`
- Lỗi 4: Dòng 7 — Input "Nhập lại mật khẩu" thiếu định dan không có name và id khiến không thể xử lý logic so sánh mật khẩu qua JavaScript 
    - Sửa: `<label for="re-pwd">Nhập lại mật khẩu:</label> <input type="password" id="re-pwd" name="re-pwd" required>`
- Lỗi 5: Dòng 9 — Sai type cho số điện thoại và thiếu label đúng cách sử dụng type="text" thay vì type="tel" khiến bàn phím số không tự động bật lên trên thiết bị di động, đồng thời thiếu pattern kiểm tra 10 số  
    - Sửa: `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567" pattern="[0-9]{10}">`
- Lỗi 6: Dòng 11 — Thẻ `<select>` thiếu nhãn và tên biến trình duyệt không biết dữ liệu thành phố thuộc biến nào khi gửi form  
    - Sửa: `<label for="city">Thành phố:</label> <select id="city" name="city">...</select>`
- Lỗi 7: Dòng 16 — `<label>` không bao bọc hoặc liên kết với checkbox văn bản "Tôi đồng ý..." chưa được liên kết với một input type="checkbox" người dùng không thể tích chọn bằng cách nhấn vào chữ  
    - Sửa: `<input type="checkbox" id="terms" name="terms" required> <label for="terms">Tôi đồng ý điều khoản</label>`
- Lỗi 8: Cấu trúc tổng quát — Thiếu thuộc tính action và method trong thẻ `<form>` Thẻ `<form>` không khai báo phương thức gửi (POST/GET) và nơi nhận dữ liệu, dẫn đến hành vi mặc định không kiểm soát được  
    - Sửa: `<form action="#" method="POST">`

## Câu C2:
1. Viết Pattern Regex cho CMND/CCCD và Số tài khoản
   - CMND/CCCD (Đúng 12 chữ số): pattern="[0-9]{12}"
   - Số tài khoản (10-15 chữ số): pattern="\d{10,15}"
2. HTML5 Validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
   - Mặc dù HTML5 Validation rất tiện lợi để cải thiện trải nghiệm người dùng, nhưng nó không thể là rào cản bảo mật duy nhất cho các ứng dụng nhạy cảm như ngân hàng vì dễ dàng bị vô hiệu hóa: Người dùng có thể nhấn F12 để xóa thuộc tính required hoặc pattern trong mã nguồn, hoặc thêm thuộc tính novalidate vào thẻ `<form>` để vượt qua kiểm tra.
3. Liệt kê 3 loại Validation mà HTML5 KHÔNG THỂ làm được
   - So sánh chéo giữa hai trường (Cross-field Validation): Ví dụ như kiểm tra "Xác nhận mã PIN" phải trùng khớp với "Mã PIN"
   - Kiểm tra dữ liệu thời gian thực (Server-side lookup): Kiểm tra xem Số điện thoại hoặc Email đã tồn tại trong hệ thống ngân hàng hay chưa
   - Logic phức tạp (Conditional Validation): Ví dụ: Nếu khách hàng chọn phương thức nhận mã OTP qua "Email" thì trường "Email" mới trở thành bắt buộc, nếu chọn "SMS" thì không cần
4. Hai rủi ro bảo mật nếu chỉ validate trên Frontend mà không có Backend
   - Tấn công tiêm nhiễm dữ liệu (Injection Attacks): Kẻ xấu có thể gửi các đoạn mã độc hoặc câu lệnh SQL vào các trường như "Số tài khoản" để đánh cắp dữ liệu hoặc phá hoại cơ sở dữ liệu (SQL Injection)
   - Sai lệch tính toàn vẹn dữ liệu (Data Integrity): Dữ liệu rác, không đúng định dạng (ví dụ CCCD chỉ có 5 số thay vì 12) sẽ lọt vào hệ thống, gây lỗi dây chuyền cho các nghiệp vụ tài chính, báo cáo thuế và định danh khách hàng