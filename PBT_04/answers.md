# Phần A: Kiểm tra đọc hiểu
`Tài liệu tham chiếu: tuan_2_css_core/12_css_positioning.md + tuan_3_css_advanced/13_creating_responsive_layouts.md`
## Câu A1: 5 Loại Positioning
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
| :--- | :---: | :--- | :---: | :--- |
| `static` | Có | Theo luồng tự nhiên | Có | Là giá trị mặc định của mọi phần tử. |
| `relative` | Có | Chính vị trí ban đầu của nó | Có | Làm gốc tọa độ cho phần tử `absolute` con, hoặc dịch chuyển nhẹ mà không ảnh hưởng phần tử khác. |
| `absolute` | Không | Phần tử tổ tiên gần nhất có position khác static (`nearest positioned ancestor`) | Có | Làm tooltip, dropdown menu, icon thông báo nằm trên góc ảnh. |
| `fixed` | Không | Khung hình trình duyệt | Không | Thanh Header cố định ở đầu trang, nút "Lên đầu trang" (Back to top) ở góc màn hình. |
| `sticky` | Có (khi chưa dính)<br>Không (khi đang dính) | Luồng tự nhiên, dính vào Viewport khi cuộn đến mốc cấu hình (`top`, `bottom`...) | Có | Giữ thanh danh mục hoặc tiêu đề bảng luôn hiển thị ở trên cùng khi người dùng cuộn trang xuống. |

- Khi nào absolute tham chiếu body? 
  - Tất cả các phần tử cha, ông, tổ tiên bọc ngoài nó đều không cài đặt position (hoặc chỉ mang giá trị mặc định là position: static). Lúc này, do không tìm được bất kỳ "nearest positioned ancestor" nào trên đường đi, nó buộc phải lấy khung tài liệu làm gốc tọa độ để xác định vị trí
- Khi nào absolute tham chiếu parent?
  - Thẻ cha đó đã được khai báo thuộc tính position rõ ràng với một giá trị khác static
- Khái niệm "nearest positioned ancestor": là phần tử tổ tiên gần nó nhất thỏa mãn điều kiện có position khác static. Phần tử absolute con sẽ nhìn vào phần tử này để lấy làm gốc tọa độ (0,0) khi bạn chỉnh các thuộc tính top, bottom, left, right

## Câu A2 — Flexbox vs Grid
- Trường hợp 1 
`.container { display: flex; }`
`.item { flex: 1; }`
   - Dự đoán: Cả 4 items sẽ nằm trên cùng 1 hàng ngang. Nhờ thuộc tính flex: 1, không gian của container sẽ được chia đều tăm tắp, mỗi item chiếm chính xác 25% chiều rộng container.
   - Bố cục: 
    ```text 
    ┌───────────────────────────────────────────────────────────────────────────┐
    │ [ Item 1 (25%) ]  [ Item 2 (25%) ]  [ Item 3 (25%) ]  [ Item 4 (25%) ]    │
    └───────────────────────────────────────────────────────────────────────────┘

- Trường hợp 2
`.container { display: flex; flex-wrap: wrap; }`
`.item { width: 45%; margin: 2.5%; }`
   - Dự đoán: Bố cục gồm 3 hàng và 2 cột. Mỗi item chiếm tổng không gian ngang là 45\% + 2.5\% + 2.5%= 50\%
   - Bố cục:
    ```text
    ┌───────────────────────────────────────────────────────────────────────────┐
    │  (2.5%) [ Item 1 (45%) ] (2.5%)   │   (2.5%) [ Item 2 (45%) ] (2.5%)  │
    ├───────────────────────────────────┼───────────────────────────────────┤
    │  (2.5%) [ Item 3 (45%) ] (2.5%)   │   (2.5%) [ Item 4 (45%) ] (2.5%)  │
    ├───────────────────────────────────┼───────────────────────────────────┤
    │  (2.5%) [ Item 5 (45%) ] (2.5%)   │   (2.5%) [ Item 6 (45%) ] (2.5%)  │
    └───────────────────────────────────────────────────────────────────────────┘

- Trường hợp 3
.container { display: flex; justify-content: space-between; align-items: center; }
   - Dự đoán: Cả 3 items nằm trên 1 hàng ngang và căn giữa theo chiều dọc, justify-content: space-between đẩy Item 1 sát lề trái, Item 3 sát lề phải, và Item 2 sẽ nằm chính giữa khoảng trống còn lại
   - Bố cục: 
    ```text
    ┌───────────────────────────────────────────────────────────────────────────┐
    │                                                                           │
    │ [ Item 1 ]                   [ Item 2 ]                   [ Item 3 ]      │
    │                                                                           │
    └───────────────────────────────────────────────────────────────────────────┘   

- Trường hợp 4
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
   - Dự đoán: Bố cục 1 hàng, 3 cột, cột 1 và cột 3 có kích thước cố định 200px, cột 2 (1fr) linh hoạt tự động giãn nở để chiếm toàn bộ không gian còn lại ở giữa, giữa các cột có khoảng cách (gap) là 20px
   - Bố cục:
   ```text
    ┌────────────┐   gap    ┌───────────────────────────────────┐   gap    ┌────────────┐
    │  Item 1    │  (20px)  │              Item 2               │  (20px)  │  Item 3    │
    │  (200px)   │ ────────>│         (Tự co giãn / 1fr)        │<──────── │  (200px)   │
    └────────────┘          └───────────────────────────────────┘          └────────────┘

- Trường hợp 5
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
   - Dự đoán: Bố cục chia thành 3 cột và 3 hàng
   - Bố cục:
   ```text
    ┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
    │     Item 1 (1fr)     │    │     Item 2 (1fr)     │    │     Item 3 (1fr)     │
    └──────────────────────┘    └──────────────────────┘    └──────────────────────┘
        (gap: 10px)                 (gap: 10px)                 (gap: 10px)
    ┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
    │     Item 4 (1fr)     │    │     Item 5 (1fr)     │    │     Item 6 (1fr)     │
    └──────────────────────┘    └──────────────────────┘    └──────────────────────┘
        (gap: 10px)                 (gap: 10px)                 (gap: 10px)
    ┌──────────────────────┐
    │     Item 7 (1fr)     │           ( Trống )                   ( Trống )
    └──────────────────────┘