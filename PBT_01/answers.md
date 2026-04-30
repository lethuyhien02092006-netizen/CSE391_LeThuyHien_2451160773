# Phần A: Kiểm tra đọc hiểu
## Câu A1
Tài liệu tham chiếu: `tuan_1_html5/01_introduction_html_universe.md`
1. Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter, thứ tự các bước xảy ra:
   - Bước 1: DNS lookup
   - Bước 2: TCP handshake
   - Bước 3: TLS handshake
   - Bước 4: HTTP request gửi đi
   - Bước 5: Server trả Response
   - Bước 6: Parse HTML -> DOM/CSSOM
   - Bước 7: Render layout
2. Trong DevTools của Chrome, tab Network cho thấy thông tin của tất cả các HTTP request của trang. Lấy web tlu.edu.vn làm ví dụ
   ![TLU](screenshots/tlu.png)
## Câu A2
Tài liệu tham chiếu: `tuan_1_html5/04_visible_part_html.md`  

Trang web bị Google đánh giá thấp SEO vì không dùng các thẻ Semantic, bị lạm dụng thẻ `<div>` cho mọi thành phần khiến cho Google không hiểu đâu là nội dung quan trọng nhất hay thanh điều hướng hoặc thông tin bản quyền.  

Các lỗi Semantic và cách sửa:  

Lỗi 1: `<div class="header">`, `<div class="main">`, `<div class="footer">` Google phải mất công phân tích tên class mới đoán được cấu trúc thay vì hiểu ngay lập tức.  
Sửa: dùng các thẻ `<header>`, `<main>`, và `<footer>`  

Lỗi 2: `<div class = "menu">` + `<div>` bọc thẻ các link. Đây không phải navigation, screen reader sẽ không đọc được. 
Sửa: dùng `<nav><ul><li><a>...</nav></ul></li></a>`  
  
Lỗi 3: `<div class="title">` Google không biết đây là chủ đề chính của phần nội dung này sẽ bị đánh giá thấp về nội dung.  
Sửa: dùng thẻ `<h1>` hoặc `<h2>`  

Lỗi 4: Thẻ `<img>` chỉ có nguồn ảnh, không có thuộc tính alt.  
Sửa: Thêm thuộc tính alt="iPhone 16 Pro màu Titan" vào thẻ `<img>`

Đoạn code sau khi sửa:  
```<header>
    <div class="logo">ShopTLU</div>
    <nav class="menu">
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h1>iPhone 16 Pro</h1> 
        <p class="price">25.990.000đ</p>
        <figure class="image">
            <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro chính hãng">
        </figure>
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```  

## Câu A3

![Ket qua](screenshots/A3.png)  

Giải thích:
- `<div>`: Là loại thẻ Block-level element nên luôn bắt đầu trên một dòng mới và kéo dài hết chiều rộng của vùng chứa nó, các phần tử khác không thể nằm trên cùng một dòng. Thẻ này dùng để gom nhóm các phần tử khác hoặc phân chia bố cục trang web.
- `<span>`: là loại thẻ Inline element nên không bắt đầu trên dòng mới, nó chỉ chiếm vừa đủ độ rộng nội dung bên trong nó, nằm cạnh nhau trên cùng dòng và không tạo ra line break.
- `<strong>`: tương tự như `<span>`, nó không nhảy dòng, trình duyệt sẽ tự động in đậm văn bản nằm trong thẻ này.

## Câu A4:
Tài liệu tham chiếu: `tuan_1_html5/05_tables_hyperlinks.md`

- Thẻ `<thead>`: table header - phần đầu bảng, chứa các hàng tiêu đề của bàng thường là tên các cột.
- Thẻ `<tbody>`: table body - phần thân bảng, chứa các nội dung chính của bảng, một bảng có thể có nhiều `<tbody>` để phân chia các phần dữ liệu khác nhau.
- Thẻ `<tfoot>`: table footer - phần cuối bảng, chứa phần tổng kết của bảng hoặc tinh tổng hay ghi chú.

Tại sao không nên dùng table để tạo layout trang web?
- Ảnh hưởng đến SEO và khả năng truy cập: Google và các công cụ tìm kiếm sử dụng bot để đọc nội dung web. Nếu dùng bảng để làm layout, bot sẽ hiểu nhầm đó là dữ liệu quan hệ thay vì cấu trúc trang khi đó nội dung sẽ bị đọc theo thứ tự sai logic.
- Hiệu suất tải trang chậm: trình duyệt xử lý thẻ `<table>` theo cách đặc biệt đôi khi nó phải đọc toàn bộ nội dung trong bảng thì mới bắt đầu tính toán kích thước và hiển thị lên màn hình gây ra hiện tượng trang web bị khựng hoặc trắng xóa một lúc trước khi hiện ra hoàn chỉnh.
- Bảo trì và sửa chữa cực kỳ phức tạp: việc lồng các bảng vào nhau để tạo layout sẽ tạo ra mã nguồn với hàng nghìn thẻ `<td>`, `<tr>` nên khi muốn thay đổi một chút về thiết kế gần như phải viết lại toàn bộ cấu trúc HTML thay vì chỉ cần sửa một vài dòng CSS.

# Phần B
## Bài 3:
- Lỗi 1: dòng 1 - thiếu định dạng chuẩn cho khai báo DOCTYPE - cách sửa: đổi thành `<!DOCTYPE html>`
- Lỗi 2: dòng 2 - thiếu thuộc tính `lang` trong thẻ `<html>` - cách sửa: đổi thành `<html lang="vi">`
- Lỗi 3: dòng 3 - thiếu thẻ đóng cho tiêu đề trang - cách sửa: thêm `</title>` sau phần nội dung
- Lỗi 4: dòng 4 - sai định dạng mã hóa và thiếu thuộc tính nội dung - cách sửa: sửa thành `<meta charset="UTF-8">`
- Lỗi 5: dòng 7 - thẻ `<h1>` đóng sai - cách sửa: sửa thành `<h1>Welcome to ShopTLU</h1>`
- Lỗi 6: dòng 11 - thẻ `<a>` đóng sai - cách sửa: sửa thành `<a href="home">Trang chủ<a>`
- Lỗi 7: dòng 18 - thẻ `<img>` thiếu thuộc tính `alt` và giá trị `src` nên để trong ngoặc kép và nên dùng thẻ `<figure>` - cách sửa: `<img src="iphone.jpg" alt="iPhone 17 ProMax">`
- Lỗi 8: dòng 20 - thẻ `<b>` và `<p>` lỗi lồng thẻ đóng sai thứ tự - cách sửa: `<p>Giá: <b>25.990.000đ</b></p>`
- Lỗi 9: dòng 25-28 - không nên sử dụng thẻ `<td>` cho tiêu đề đầu bảng - cách sửa: thay các ô Tên, Giá bằng thẻ `<th>` và nên bọc trong thẻ `<thead>`
- Lỗi 10: dòng 34 - sử dụng thẻ `<main>` lần thứ hai, mộtn trang chỉ được có duy nhất một thẻ `<main>` - cách sửa: thay `<main>` thứ hai thành thẻ `<aside>`
- Lỗi 11: dòng 39 - thẻ `<p>` chưa có thẻ đóng - cách sửa: `<p>Copyright 2026</p>`
- Lỗi 12: dòng 5 - thiếu thẻ `<meta viewport>` - cách sửa: thêm `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

## Bài 4:
1. Trang shopee có 3 Semantic được đưa ra:
- Thẻ `<header>`: hiển thị của phần đâu trang, bao phủ toàn bộ thanh điều hướng trên cùng
- Thẻ `<nav>`: nằm bên trong thẻ `<header>`, đây là thanh điều hướng nằm phía trên cùng của trang web chứa các liên kết chính
- Thẻ `<form>`: đây là khung tìm kiếm màu trắng, nằm sâu bên trong phần header
2. Em không tìm thấy có sử dụng `<table>`
3. Trong web shopee ở phần form tìm kiếm thì không hiển thị trực tiếp thuộc tính action và method, trang có dùng `<input type="text">`, mặc dù trong ảnh thẻ `<input>` không ghi rõ thuộc tính type, nhưng trong HTML, khi không khai báo type, trình duyệt sẽ tự động hiểu đó là type="text"

# Phần C: Suy luận
## Câu 1: thiết kế cấu trúc

```<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Telephone Store</title>
</head>
<body>
    <header><!-- Dùng để chứa các yếu tố mang tính nhận diện thương hiệu và công cụ tìm kiếm toàn trang -->
        <h1>Telephone Store</h1>       
        <nav><!--Dùng để bao bọc tập hợp các liên kết điều hướng chính của website -->
            <ul>
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Điện thoại</a></li>
            </ul>
        </nav>
    </header>
    
    <main><!--Chỉ được có 1 thẻ duy nhất, bao bọc nội dung chính yếu và độc nhất của trang này -->        
        <nav aria-label="Breadcrumb">  <!--nó là điều hướng phân cấp nên vẫn dùng nav -->
            <ul>
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Điện thoại</a></li>
                <li>iPhone 17 Pro</li>
            </ul>
        </nav>
        <article><!--Dùng vì toàn bộ thông tin sản phẩm này là một đơn vị nội dung độc lập, có thể tái sử dụng hoặc đứng một mình -->            
            <section id="gallery"><!--Chia nhỏ các khu vực có chủ đề riêng biệt bên trong bài viết -->
                <!-- Figure: Dùng để chứa ảnh đi kèm với chú thích, tạo mối liên kết ngữ nghĩa giữa chúng -->
                <figure>
                    <img src="iphone-main.jpg" alt="iPhone 17 Pro màu cam">
                    <!-- Figcaption: Chú thích cụ thể cho nội dung của figure bên trên -->
                    <figcaption>Phiên bản cam cực sang trọng</figcaption>
                </figure>
                
                <!-- Ul: Dùng để liệt kê các ảnh thumbnail, vì bản chất chúng là một danh sách các hình ảnh phụ -->
                <ul class="thumbnails">
                    <li><img src="thumb1.jpg" alt="Cạnh bên"></li>
                    <li><img src="thumb2.jpg" alt="Mặt lưng"></li>
                </ul>
            </section>

            <!-- Khu vực 2: Thông tin chi tiết và giá bán -->
            <section id="product-details">
                <!-- H2: Tiêu đề quan trọng thứ 2 sau H1, dùng để định danh tên sản phẩm chính -->
                <h2>iPhone 17 Pro 256GB</h2>               
                <p>Đánh giá: 5/5 sao</p>               
                <!-- Strong/Mark: Dùng để nhấn mạnh giá tiền, vì đây là thông tin quan trọng nhất người dùng tìm kiếm -->
                <p>Giá hiện tại: <mark>28.990.000đ</mark></p>
                <!-- Article: Dùng bên trong section để chứa đoạn mô tả, vì đoạn văn này là một mẩu tin độc lập -->
                <article>
                    <h3>Mô tả sản phẩm</h3>
                    <p>Chip A18 Pro cực mạnh, camera cải tiến</p>
                </article>
            </section>

            <!-- Khu vực 3: Bảng thông số kỹ thuật -->
            <section id="specs">
                <h2>Thông số kỹ thuật</h2>
                <!-- Table: Duy nhất và bắt buộc khi trình bày dữ liệu đối chiếu giữa các tiêu chí và giá trị -->
                <table>
                    <thead>
                        <tr>
                            <th>Tiêu chí</th>
                            <th>Thông số</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Màn hình</td>
                            <td>6.3 inch Super Retina XDR</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <!-- Khu vực 4: Bình luận/Đánh giá -->
            <section id="reviews">
                <h2>Bình luận từ khách hàng</h2>
                <!-- Article: Mỗi một bình luận khách hàng là một nội dung độc lập, có tác giả và thời gian riêng -->
                <article class="comment">
                    <header>
                        <strong>Lê Văn A</strong>
                        <!-- Time: Dùng để máy tính/bot đọc chính xác định dạng ngày tháng thay vì chỉ là chữ bình thường -->
                        <time datetime="2024-04-30">30/04/2024</time>
                    </header>
                    <p>Sản phẩm dùng rất tốt, giao hàng nhanh!</p>
                </article>
            </section>

        </article>
    </main>

    <!-- Aside: Dùng cho Sidebar vì "Sản phẩm tương tự" chỉ là nội dung bổ trợ, không nằm trong luồng chính của sản phẩm đang xem -->
    <aside>
        <h3>Có thể bạn cũng thích</h3>
        <ul>
            <li><a href="#">iPhone 15 Pro Max</a></li>
            <li><a href="#">iPhone 16 thường</a></li>
        </ul>
    </aside>
    <!-- Footer: Chứa thông tin về bản quyền, liên hệ và các chính sách phụ của website -->
    <footer>
        <p>&copy; Telephone Store - Hệ thống bán lẻ ủy quyền</p>
        <nav>
            <a href="#">Chính sách bảo hành</a> | 
            <a href="#">Liên hệ</a>
        </nav>
    </footer>
</body>
</html>
```


## Câu C2:
Việc lạm dụng thẻ `<div>` thay vì Semantic HTML không chỉ là vấn đề thói quen, mà nó còn trực tiếp làm giảm chất lượng và giá trị kỹ thuật của sản phẩm web. Những lý do tại sao chúng ta nên ưu tiên các thẻ ngữ nghĩa.Thứ nhất, về mặt SEO (Tối ưu hóa công cụ tìm kiếm) các công cụ tìm kiếm như Google dựa vào cấu trúc mã để hiểu nội dung quan trọng nhất trên trang. Thẻ `<div>` là thẻ "vô nghĩa", trong khi các thẻ như `<main>`, `<article>`, hay `<h1>` là các tín hiệu chỉ đường mạnh mẽ. Nếu mọi thứ đều là `<div>`, bot sẽ gặp khó khăn trong việc xác định chủ đề chính, dẫn đến việc xếp hạng từ khóa kém hiệu quả hơn so với các đối thủ có cấu trúc chuẩn.  Thứ hai, về tính Accessibility (Khả năng truy cập) các thiết bị hỗ trợ người khiếm thị (Screen Readers) sử dụng thẻ Semantic để tạo ra một "bản đồ nội dung". Khi dùng `<nav>`, thiết bị sẽ thông báo "Đây là menu điều hướng", giúp người dùng nhanh chóng tìm thấy thứ họ cần. Ngược lại, một trang web chỉ toàn `<div>` sẽ khiến người dùng khiếm thị bị lạc trong một biển văn bản không có điểm dừng hay định danh rõ ràng. Ví dụ chứng minh cụ thể: Hãy nhìn vào thanh tìm kiếm của Shopee. Thay vì dùng `<div>`, họ sử dụng `<form role="search">` kết hợp với `<input aria-label="...">`. Điều này giúp trình duyệt tự động hiểu đây là chức năng tìm kiếm, cho phép người dùng nhấn "Enter" để gửi dữ liệu một cách tự nhiên và giúp các công cụ hỗ trợ nhận diện ngay lập tức chức năng của ô nhập liệu này. Trường hợp thực tế mà `<div>` vẫn phù hợp: Thẻ `<div>` vẫn cực kỳ hữu ích khi đóng vai trò là các "thùng chứa" (containers) chỉ phục vụ mục đích trang trí hoặc bố cục (layout). Ví dụ, khi bạn cần một thẻ bao bọc (wrapper) để căn giữa nội dung bằng Flexbox, hoặc tạo một hiệu ứng đổ bóng phức tạp mà không mang ý nghĩa nội dung cụ thể, thì `<div>` chính là sự lựa chọn đúng đắn vì nó không làm nhiễu cấu trúc ngữ nghĩa của trang.