# Phần A: Kiểm tra đọc hiểu
Tài liệu tham chiếu: `tuan_2_css_core/08_introduction_css.md → 11_box_model.md`
## Câu A1: Cách nhúng CSS
3 cách nhúng CSS:
1. Inline CSS trong thẻ
   vd: `<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>`
- Ưu điểm: nhanh, tiện khi muốn test nhanh một thuộc tính
- Nhược điểm: code HTML trở nên rối, khó bảo trì, tránh dùng
- Khi nào nên dùng: khi cần đè một style khác cấp bách hoặc dùng trong email HTML
2. Internal CSS (trong `<style>`)
   vd:  
```
<head>
    <style>
        h1 { color: red; font-size: 24px; }
    </style>
</head>
```
- Ưu điểm: quản lý tập trung các style của một trang duy nhất không cần tạo thêm file bên ngoài
- Nhược điểm: chỉ có tác dụng trên trang đó. Nếu website có nhiều trang  sẽ phải copy đoạn code này sang từng trang, gây lãng phí dung lượng
- Khi nào nên dùng: khi chỉ làm một trang web duy nhất hoặc muốn các quy tắc CSS đó là duy nhất cho trang này
1. External CSS 
   vd:
```
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```
- Ưu điểm: Chuẩn production, chuyên nghiệp nhất một file CSS có thể dùng cho hàng nghìn trang HTML giúp trình duyệt tải nhanh hơn nhờ cơ chế bộ nhớ đệm
- Nhược điểm: tốn thêm một yêu cầu HTTP để tải file về
- Khi nào nên dùng: luôn luôn ưu tiên cách này cho các dự án thực tế để đảm bảo tính sạch sẽ và dễ quản lý
Nếu cùng một element bị cả 3 cách tác động, thứ tự ưu tiên (Specificity) sẽ như sau:

### Giải thích:
Thứ tự ưu tiên sẽ là : Inline CSS > Internal CSS = External CSS
1.  Inline CSS "vô đối": Vì nó nằm trực tiếp trên thẻ, trình duyệt coi nó là chỉ thị cụ thể nhất và gần nhất với phần tử, nên nó sẽ có ưu tiên cao nhất.
2.  Internal vs External: Hai cách này có độ ưu tiên ngang nhau. Trong trường hợp này, trình duyệt sẽ áp dụng quy tắc "cái nào xuất hiện sau thì thắng" (Cascading). 
    *   Nếu thẻ `<link>` đặt dưới thẻ `<style>`, External thắng.
    *   Nếu thẻ `<style>` đặt dưới thẻ `<link>`, Internal thắng

## Câu A2: CSS Selectors
1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 25.990.000đ và 45.990.000đ
3. #app header                  → Chọn: toàn bộ nội dung bên trong thẻ `<header>`
4. nav a:first-child             → Chọn: Home
5. .product.featured h2         → Chọn: MacBook Pro
6. article > p                  → Chọn: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, Mô tả sản phẩm...
7. a[href="/"]                  → Chọn: Home
8. .top-bar.dark h1              → Chọn: ShopTLU

## Câu A3: Box Model
```
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = ???
→ Không gian chiếm trên trang = ???

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = ???
→ Kích thước content thực tế = ???
→ Không gian chiếm trên trang = ???

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = ???
→ Giải thích tại sao KHÔNG PHẢI 65px
```