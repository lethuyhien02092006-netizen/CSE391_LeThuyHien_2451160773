function formatMoney(amount) {
    return Math.round(amount).toLocaleString("vi-VN") + "đ";
}

function formatShort(amount) {
    if (amount >= 1000 && amount % 1000 === 0) {
        return (amount / 1000) + "k";
    }
    return formatMoney(amount);
}

function padLine(left, right, width) {
    const total = width || 38;
    const spaces = total - left.length - right.length;
    return left + " ".repeat(Math.max(1, spaces)) + right;
}

function tinhHoaDon(monAn, options) {
    options = options || {};
    const coTip = options.tip !== false;
    const ngay = options.ngay || new Date();

    let subtotal = 0;
    const lines = [];

    for (let i = 0; i < monAn.length; i++) {
        const item = monAn[i];
        const thanhTien = item.gia * item.soLuong;
        subtotal += thanhTien;
        lines.push({
            stt: i + 1,
            ten: item.ten,
            soLuong: item.soLuong,
            gia: item.gia,
            thanhTien: thanhTien,
        });
    }

    let phanTramGiam = 0;
    if (subtotal > 1000000) {
        phanTramGiam = 15;
    } else if (subtotal > 500000) {
        phanTramGiam = 10;
    }

    if (ngay.getDay() === 3) {
        phanTramGiam += 5;
    }

    const tienGiam = subtotal * phanTramGiam / 100;
    const sauGiam = subtotal - tienGiam;
    const vat = sauGiam * 0.08;
    const tip = coTip ? sauGiam * 0.05 : 0;
    const thanhToan = sauGiam + vat + tip;

    const w = 38;
    console.log("╔" + "═".repeat(w) + "╗");
    const title = "        HÓA ĐƠN NHÀ HÀNG           ";
    console.log("║" + title.substring(0, w) + "║");
    console.log("╠" + "═".repeat(w) + "╣");

    for (let i = 0; i < lines.length; i++) {
        const L = lines[i];
        const left = " " + L.stt + ". " + L.ten.padEnd(10) + " x" + L.soLuong + "    @" + formatShort(L.gia);
        const right = "= " + formatShort(L.thanhTien);
        console.log("║" + padLine(left, right, w) + "║");
    }

    console.log("╠" + "═".repeat(w) + "╣");
    console.log("║" + padLine(" Tổng cộng:", formatMoney(subtotal), w) + "║");
    console.log("║" + padLine(" Giảm giá (" + phanTramGiam + "%):", formatMoney(tienGiam), w) + "║");
    console.log("║" + padLine(" VAT (8%):", formatMoney(vat), w) + "║");
    if (coTip) {
        console.log("║" + padLine(" Tip (5%):", formatMoney(tip), w) + "║");
    }
    console.log("╠" + "═".repeat(w) + "╣");
    console.log("║" + padLine(" THANH TOÁN:", formatMoney(thanhToan), w) + "║");
    console.log("╚" + "═".repeat(w) + "╝");

    return { subtotal, tienGiam, vat, tip, thanhToan };
}

const monDemo = [
    { ten: "Phở bò", gia: 65000, soLuong: 2 },
    { ten: "Trà đá", gia: 5000, soLuong: 3 },
    { ten: "Bún chả", gia: 55000, soLuong: 1 },
];

tinhHoaDon(monDemo, { tip: true, ngay: new Date(2026, 4, 29) });
