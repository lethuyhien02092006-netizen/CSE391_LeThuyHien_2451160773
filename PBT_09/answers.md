# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

## Câu A1 (5đ) — DOM Tree

### Sơ đồ DOM Tree
```text
div#app
├── header
│   ├── h1 ("Todo App")
│   └── nav
│       ├── a.active ("All")
│       ├── a ("Active")
│       └── a ("Completed")
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button ("Add")
    └── ul#todoList
        ├── li.todo-item ("Learn HTML")
        └── li.todo-item.completed ("Learn CSS")
```

### querySelector cho mỗi yêu cầu:
- Chọn thẻ `<h1>`: `document.querySelector('h1')`
- Chọn input trong form: `document.querySelector('#todoInput')` hoặc `document.querySelector('#todoForm input')`
- Chọn tất cả `.todo-item`: `document.querySelectorAll('.todo-item')`
- Chọn link đang active: `document.querySelector('a.active')`
- Chọn `<li>` đầu tiên trong `#todoList`: `document.querySelector('#todoList li:first-child')`
- Chọn tất cả `<a>` bên trong `<nav>`: `document.querySelectorAll('nav a')`

## Câu A2 (5đ) — innerHTML vs textContent

**Sự khác nhau:**
- `innerHTML`: Trả về hoặc thiết lập nội dung HTML (bao gồm cả các thẻ HTML) bên trong một phần tử. Nó sẽ phân tích cú pháp chuỗi truyền vào dưới dạng HTML.
- `textContent`: Trả về hoặc thiết lập nội dung văn bản (text thuần) của một phần tử. Nó sẽ bỏ qua tất cả các thẻ HTML và coi chuỗi truyền vào như một text thông thường.

**Khi nào dùng:**
- Dùng `innerHTML`: Khi bạn THỰC SỰ cần chèn các thẻ HTML mới vào trong một element có sẵn. (Ví dụ: render một cấu trúc thẻ HTML được tạo từ chuỗi).
- Dùng `textContent`: Khi bạn chỉ cần cập nhật chữ (text) thuần túy bên trong element, đặc biệt là khi dữ liệu đó do người dùng nhập vào để đảm bảo tính an toàn.

**Bảo mật:** 
Tại sao `innerHTML` có thể gây lỗ hổng XSS?
Vì `innerHTML` sẽ biên dịch và hiển thị chuỗi như HTML thực thụ. Nếu chuỗi đó chứa thẻ `<script>` hoặc các event handler độc hại như `onerror`, trình duyệt sẽ chạy luôn đoạn mã đó, dẫn đến việc hacker có thể thực thi JavaScript (XSS - Cross Site Scripting) để lấy cắp session, cookie, hay thay đổi giao diện.

**Sửa code minh họa:**
```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;

// Dùng textContent thay vì innerHTML để bảo mật
document.querySelector("#result").textContent = userInput;
```

## Câu A3 (5đ) — Event Bubbling

**Khi click vào button, output = ???**
Sự kiện sẽ xảy ra trên element được click đầu tiên, sau đó nổi bọt (bubble) lên các element cha theo thứ tự từ trong ra ngoài.
```text
BUTTON
INNER
OUTER
```

**Nếu uncomment `e.stopPropagation()`, output = ???**
Hàm `stopPropagation()` sẽ ngăn chặn việc lan truyền sự kiện (bubbling) lên các thẻ cha. 
```text
BUTTON
```

---

# PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

## Câu C1 (8đ) — Debug DOM Code

**Các lỗi trong code ban đầu:**
1. `document.querySelector("#decrementBtn").addEventListener("onclick", ...)` -> Sai tên event, phải là `"click"`.
2. `countDisplay = count;` -> Gán dữ liệu nguyên thủy (số) cho một biến chứa DOM Element. Phải là `countDisplay.textContent = count;`.
3. `item.remove;` -> Lỗi cú pháp gọi hàm, `remove` là một function, phải có ngoặc tròn: `item.remove();`.
4. Khi gán trực tiếp event click trên thẻ `li` lúc tạo mới, nhưng lúc lấy dữ liệu load từ localStorage lại bằng `historyList.innerHTML`, các event click đó sẽ BỊ MẤT. Phải dùng Event Delegation.
5. Cập nhật `countDisplay.innerHTML = count` không sai nhưng dùng `textContent` là best practice cho performance.
6. Khi clear history, gán `historyList.innerHTML = null;` có thể hiển thị chuỗi `"null"`. Thay vào đó nên dùng `""`.
7. `localStorage.getItem("count")` trả về String. Khi lấy lên phải ép kiểu sang Number và xử lý trường hợp giá trị null/undefined.
8. Gọi hàm `element.parentNode.removeChild(element)` hơi dài, có thể tối ưu bằng `element.remove()`.

**Code đã sửa:**
```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

// Sửa lỗi ép kiểu khi load từ localStorage (Lỗi 7)
let count = Number(localStorage.getItem("count")) || 0;
historyList.innerHTML = localStorage.getItem("history") || "";

// Sửa lỗi mất event xóa khi load thẻ <li> từ localStorage: 
// Chuyển sang Event Delegation (Lỗi 4)
historyList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.remove(); // Tối ưu (Lỗi 8)
    }
});

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count; // Tối ưu (Lỗi 5)
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

// "onclick" -> "click" (Lỗi 1)
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count; // Gán text thay vì gán object DOM (Lỗi 2)
    historyList.innerHTML = ""; // Dùng "" thay vì null (Lỗi 6)
});

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    // Có thể dùng historyList.innerHTML = "" cho nhanh. 
    // Hoặc sửa lỗi vòng lặp:
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); // item.remove -> item.remove() (Lỗi 3)
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    // count đã được lấy ở trên khi khai báo
    countDisplay.textContent = count;
});
```

## Câu C2 (7đ) — Performance

**Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?**
- **Tốn bộ nhớ (Memory):** Tạo 1000 event listeners sẽ chiếm dụng RAM nhiều hơn.
- **Tốn thời gian khởi tạo (Performance):** Tốn thời gian CPU để attach từng sự kiện lúc render trang.
- **Khó khăn trong cập nhật (Maintenance / Bugs):** Nếu sau này có một elements mới được sinh ra (hoặc xóa đi) bằng JS, bạn phải gán lại (hoặc dọn dẹp) event listener cho elements đó thủ công, nếu không rất dễ bị memory leak hoặc thiếu logic.

**Event Delegation giải quyết thế nào?**
Event Delegation lợi dụng tính chất **Event Bubbling** (lan truyền nổi bọt) của DOM. Ta chỉ cần gắn MỘT listener duy nhất vào phần tử cha chứa tất cả các phần tử con đó. Khi có hành động click vào phần tử con, sự kiện sẽ lan truyền lên phần tử cha. Tại đó ta sử dụng `event.target` để xác định phần tử con nào thực sự được click và xử lý tương ứng.

**Refactor dùng DocumentFragment:**
```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // Chỉ append vào fragment (chưa đưa vào DOM thật)
}

document.body.appendChild(fragment); // Gắn 1000 element vào DOM cùng 1 lúc
```

**Giải thích tại sao nhanh hơn:**
Mỗi lần gọi `document.body.appendChild(div)`, trình duyệt sẽ tính toán lại layout và render lại giao diện (gọi là quá trình **Reflow** và **Repaint**). Làm như vậy 1000 lần sẽ tốn rất nhiều tài nguyên hệ thống.
`DocumentFragment` là một cấu trúc DOM ảo, độc lập và không xuất hiện trên màn hình. Việc thêm 1000 thẻ `div` vào `fragment` không hề kích hoạt Reflow hay Repaint. Cuối cùng, khi ta đưa `fragment` vào `document.body`, 1000 thẻ `div` này sẽ được chèn vào DOM thực tế chỉ với **DUY NHẤT 1 LẦN Reflow/Repaint**, cải thiện hiệu suất vô cùng rõ rệt.
