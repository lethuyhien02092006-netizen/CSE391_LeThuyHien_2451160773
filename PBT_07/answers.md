## PHẦN A — KIỂM TRA ĐỌC HIỂU

### A1 — var / let / const

| Đoạn | Dự đoán | Kết quả chạy (`var_let_const.js`) |
|------|---------|-----------------------------------|
| 1 | `undefined` | `undefined` ✓ |
| 2 | **Lỗi** ReferenceError | `Cannot access 'y' before initialization` ✓ |
| 3 | **Lỗi** TypeError | `Assignment to constant variable` ✓ |
| 4 | `[1, 2, 3, 4]` | `[1, 2, 3, 4]` ✓ |
| 5 | Trong: `2`, Ngoài: `1` | Đúng ✓ |

**Giải thích ngắn:**

- **Đoạn 1:** `var` được *hoisting* — khai báo đưa lên đầu scope nhưng chưa gán → `undefined`, không phải lỗi.
- **Đoạn 2:** `let` có *Temporal Dead Zone* — không truy cập trước dòng khai báo.
- **Đoạn 3:** `const` không gán lại biến; vẫn **sửa được** nội dung object/array (đoạn 4).
- **Đoạn 5:** `let` trong `{}` là biến riêng (block scope), không đè biến ngoài.

---

### A2 — Data Types & Coercion

| Biểu thức | Dự đoán | Chạy thực tế |
|-----------|---------|--------------|
| `typeof null` | `"object"` | `object` |
| `typeof undefined` | `"undefined"` | `undefined` |
| `typeof NaN` | `"number"` | `number` |
| `"5" + 3` | `"53"` | `53` |
| `"5" - 3` | `2` | `2` |
| `"5" * "3"` | `15` | `15` |
| `true + true` | `2` | `2` |
| `[] + []` | `""` | (dòng trống) |
| `[] + {}` | `"[object Object]"` | `[object Object]` |
| `{} + []` | `"[object Object]"` | `[object Object]` |

**Vì sao `"5" + 3` ≠ `"5" - 3`?**

- Toán tử `+` có ưu tiên **nối chuỗi** nếu một vế là string → `"5" + 3` → `"53"`.
- Toán tử `-` chỉ làm số → `"5"` ép thành `5` → `5 - 3 = 2`.

`typeof null === "object"` là lỗi lịch sử của JS (null không phải object).

---

### A3 — == vs ===

| Biểu thức | Dự đoán | Kết quả |
|-----------|---------|---------|
| `5 == "5"` | `true` | `true` |
| `5 === "5"` | `false` | `false` |
| `null == undefined` | `true` | `true` |
| `null === undefined` | `false` | `false` |
| `NaN == NaN` | `false` | `false` |
| `0 == false` | `true` | `true` |
| `0 === false` | `false` | `false` |
| `"" == false` | `true` | `true` |

**Nên dùng `===` (và `!==`)** — so sánh cả **giá trị và kiểu**, không ép kiểu → ít bug, dễ đọc.

---

### A4 — Truthy & Falsy

**8 giá trị Falsy trong JavaScript:**

`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`

| Câu lệnh | In? | Lý do |
|----------|-----|-------|
| `if ("0")` → A | **Có** | Chuỗi không rỗng → truthy |
| `if ("")` → B | Không | Falsy |
| `if ([])` → C | **Có** | Mảng (kể cả rỗng) là object → truthy |
| `if ({})` → D | **Có** | Object rỗng vẫn truthy |
| `if (null)` → E | Không | Falsy |
| `if (0)` → F | Không | Falsy |
| `if (-1)` → G | **Có** | Số khác 0 → truthy |
| `if (" ")` → H | **Có** | Chuỗi có khoảng trắng → truthy |

---

### A5 — Template Literals

```javascript
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

---

## PHẦN C — SUY LUẬN

### C1 — Debug JavaScript

| # | Lỗi | Giải thích | Cách sửa |
|---|-----|------------|----------|
| 1 | `if (giaSauGiam = 0)` | Dùng `=` (gán) thay vì so sánh → luôn gán 0, điều kiện sai | `if (giaSauGiam === 0)` |
| 2 | `tinhGiaGiamGia("100000", 20)` | `giaBan` là string — nên ép/kiểm tra số | `Number(giaBan)` hoặc `typeof giaBan === "number"` |
| 3 | Thiếu `;` sau `return "..."` | Vẫn chạy (ASI) nhưng dễ lỗi style | Thêm `;` |
| 4 | `for (var i = ...)` + `setTimeout` | **Lỗi ẩn:** `var` không có block scope → sau vòng lặp `i === 5` → in 5 lần `"Item 5"` | Đổi `for (let i = 0; ...)` |
| 5 | Closure dùng chung `i` | Cùng nguyên nhân với `var` | `let` tạo `i` riêng mỗi lần lặp |
| 6 | `phanTramGiam > 100` | Logic đúng; test `110` trả chuỗi lỗi — OK | — |
| 7 | Không validate `giaBan` âm / NaN | Có thể ra kết quả sai | Thêm kiểm tra đầu hàm |

**Code đã sửa:** xem `tinh_gia_fixed.js`.

```javascript
// Sửa chính:
if (giaSauGiam === 0) { ... }
tinhGiaGiamGia(100000, 20);  // number, không string
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log("Item " + i);  // 0,1,2,3,4
    }, 1000);
}
```

---

### C2 — Hóa đơn nhà hàng

**Quy tắc áp dụng:**

1. Tổng món → `subtotal`
2. Giảm: `> 500k` → 10%; `> 1tr` → 15% (ưu tiên mức cao hơn)
3. Thứ Tư (`getDay() === 3`) → +5% (cộng thêm vào % giảm)
4. `sauGiam = subtotal - giảm`
5. VAT 8% trên `sauGiam`; Tip 5% (tùy chọn) trên `sauGiam`
6. Thanh toán = `sauGiam + VAT + Tip`

**Chương trình:** `restaurant_bill.js` — chạy: `node restaurant_bill.js`

Ví demo (200k, không đủ ngưỡng giảm): Tổng 200.000đ → VAT 16.000đ → Tip 10.000đ → **226.000đ**.

---

## PHẦN B — FILE THỰC HÀNH

| Bài | File | Chạy |
|-----|------|------|
| B1 | `calculator.js` | `node calculator.js` |
| B2 | `student_data.js` | `node student_data.js` |
| B3 | `guess_number.html` + `guess.js` | Mở HTML trong trình duyệt |
| B4 | `fizzbuzz.js` | `node fizzbuzz.js` |
| A1 test | `var_let_const.js` | `node var_let_const.js` |
