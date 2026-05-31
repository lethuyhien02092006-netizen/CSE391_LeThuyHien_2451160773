## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

#### Viết hàm `tinhThueBaoHiem(luong)` theo 3 cách

Quy tắc: **Thuế = 10%** nếu lương **> 11 triệu**, **0%** nếu **≤ 11 triệu**.  
Trả về: `{ thuong, thuc_nhan }` — trong đó `thuong` là số tiền thuế, `thuc_nhan = luong - thuong`.

```javascript
function tinhThueBaoHiem(luong) {
    const thuong = luong > 11_000_000 ? luong * 0.1 : 0;
    return { thuong, thuc_nhan: luong - thuong };
}

const tinhThueBaoHiem = function (luong) {
    const thuong = luong > 11_000_000 ? luong * 0.1 : 0;
    return { thuong, thuc_nhan: luong - thuong };
};

const tinhThueBaoHiem = (luong) => {
    const thuong = luong > 11_000_000 ? luong * 0.1 : 0;
    return { thuong, thuc_nhan: luong - thuong };
};
```

**Ví dụ:** `tinhThueBaoHiem(12_000_000)` → `{ thuong: 1_200_000, thuc_nhan: 10_800_000 }`  
**Ví dụ:** `tinhThueBaoHiem(10_000_000)` → `{ thuong: 0, thuc_nhan: 10_000_000 }`

*(Code mẫu: `a1_tinh_thue.js`)*

---

#### Hoisting — 3 cách có khác nhau không?

**Có.** Chỉ **Function Declaration** được hoisting **toàn bộ hàm**; Expression và Arrow **không**.

| Cách | Gọi trước dòng khai báo |
|------|-------------------------|
| Declaration | ✅ Chạy được |
| Expression (`const fn = function...`) | ❌ `ReferenceError` (TDZ) hoặc `TypeError` |
| Arrow (`const fn = () => ...`) | ❌ `ReferenceError` (TDZ) |

```javascript
// ✅ Declaration — hoisting
console.log(tinhThue(12_000_000)); // { thuong: 1200000, thuc_nhan: 10800000 }

function tinhThue(luong) {
    const thuong = luong > 11_000_000 ? luong * 0.1 : 0;
    return { thuong, thuc_nhan: luong - thuong };
}

// ❌ Expression — chưa gán hàm khi gọi
console.log(tinhThue2(12_000_000)); // ReferenceError: Cannot access 'tinhThue2' before initialization
const tinhThue2 = function (luong) { /* ... */ };

// ❌ Arrow — tương tự
console.log(tinhThue3(12_000_000)); // ReferenceError
const tinhThue3 = (luong) => { /* ... */ };
```

**Giải thích ngắn:** Engine đưa `function tinhThue() {}` lên đầu scope khi parse. Với `const tinhThue = ...`, chỉ tên biến được hoist; giá trị (hàm) gán sau → gọi sớm gặp TDZ.

---

### Câu A2 (5đ) — Scope & Closure

#### Đoạn 1 — Dự đoán output

```javascript
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```

**Giải thích:** `counter()` tạo **closure** — `count` nằm trong lexical environment, không bị GC vì các arrow function vẫn tham chiếu. Mọi method dùng **cùng một** `count`.

---

#### Đoạn 2 — Dự đoán output (sau ~200ms)

```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**Tại sao `var` và `let` khác nhau trong vòng lặp + `setTimeout`?**

- **`var i`:** một biến duy nhất ở **function scope** (hoặc global). Vòng lặp chạy xong rồi callback mới chạy (100ms) → lúc đó `i === 3` → cả 3 lần in `3`.
- **`let j`:** mỗi lần lặp có **binding riêng** (block scope). Mỗi arrow function “bắt” đúng `j` của vòng đó → `0`, `1`, `2`.

```javascript
// var — closure giữ tham chiếu tới CÙNG biến i (cuối cùng = 3)
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}

// let — mỗi vòng một j mới
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
```

---

### Câu A3 (5đ) — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

| # | Yêu cầu | Một dòng code (arrow function) | Kết quả |
|---|---------|----------------------------------|---------|
| 1 | Số chẵn | `nums.filter(n => n % 2 === 0)` | `[2, 4, 6, 8, 10]` |
| 2 | Nhân 3 | `nums.map(n => n * 3)` | `[3, 6, 9, ..., 30]` |
| 3 | Tổng | `nums.reduce((s, n) => s + n, 0)` | `55` |
| 4 | Số đầu > 7 | `nums.find(n => n > 7)` | `8` |
| 5 | Có số > 10? | `nums.some(n => n > 10)` | `false` |
| 6 | Tất cả > 0? | `nums.every(n => n > 0)` | `true` |
| 7 | Chuỗi chẵn/lẻ | `nums.map(n => \`Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}\`)` | `["Số 1 là lẻ", ...]` |
| 8 | Đảo (không mutate) | `[...nums].reverse()` hoặc `nums.toReversed()` | `[10, 9, ..., 1]` |

**Lưu ý #8:** `nums.reverse()` sửa mảng gốc; dùng spread hoặc `toReversed()` để không đổi `nums`.

---

### Câu A4 (5đ) — Object Destructuring & Spread

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                     // ReferenceError: specs is not defined

const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (gốc KHÔNG đổi)

const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16 (không phải 8)
```

#### Giải thích từng ý

1. **`specs: { ram, color }`** — nested destructuring + đổi tên: lấy `ram`, `color` từ `product.specs`; biến `specs` **không** tồn tại → `console.log(specs)` lỗi.

2. **Spread `{ ...product, price, sale }`** — shallow copy cấp 1: object `product` gốc giữ nguyên; `updated` là object mới, ghi đè `price`, thêm `sale`.

3. **Spread gotcha** — `{ ...product }` chỉ copy **tham chiếu** tới `specs`. `copy.specs` và `product.specs` **cùng một object** → `copy.specs.ram = 16` đổi luôn RAM trên `product`.

**Cách copy sâu `specs` (nếu cần tách):**

```javascript
const copy = { ...product, specs: { ...product.specs } };
copy.specs.ram = 16; // product.specs.ram vẫn là 8
```

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Refactor `processOrders`

**Yêu cầu:** ≤ 10 dòng, dùng `filter`, `map`, `sort`, destructuring, arrow functions.

```javascript
const processOrders = (orders) =>
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => {
            const discount = total * 0.1;
            return { id, customer, total, discount, finalTotal: total - discount };
        })
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

**So với code cũ:**

| Bước cũ | Cách mới |
|---------|----------|
| `for` + `if` lọc completed & total > 100k | `.filter()` |
| Tạo `item` thủ công | `.map()` + destructuring |
| Bubble sort 2 vòng `for` | `.sort((a,b) => b.finalTotal - a.finalTotal)` |

*(File: `process_orders.js`)*

---

### Câu C2 (10đ) — Thiết kế `miniArray`

Thư viện nhỏ cung cấp `map`, `filter`, `reduce` **tự viết** (không dùng built-in của mảng).

#### Thiết kế API

```javascript
const miniArray = {
    map(arr, fn)       { /* trả mảng mới, gọi fn(element, index, arr) */ },
    filter(arr, fn)    { /* trả mảng phần tử thỏa fn */ },
    reduce(arr, fn, initialValue) { /* gộp về một giá trị */ }
};
```

- **`fn`** nhận giống native: `(element, index, array)`.
- **`reduce`:** nếu có `initialValue` thì bắt đầu từ đó; nếu không có và `arr` rỗng → throw (giống spec ES).

#### Implementation

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) result.push(arr[i]);
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let acc = initialValue;
        let start = 0;
        if (initialValue === undefined) {
            if (arr.length === 0) {
                throw new TypeError("Reduce of empty array with no initial value");
            }
            acc = arr[0];
            start = 1;
        }
        for (let i = start; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    },
};
```

#### Test (phải pass)

```javascript
console.log(miniArray.map([1, 2, 3], x => x * 2));           // [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));     // [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // 10
```

*(File chạy được: `mini_array.js` — đã test exit code 0)*

---

## Liên kết file trong project

| Phần | File |
|------|------|
| A1 code mẫu | `a1_tinh_thue.js` |
| C1 refactor | `process_orders.js` |
| C2 miniArray | `mini_array.js` |
| B (thực hành) | `product_manager.js`, `shopping_cart.js`, `higher_order.js` |
