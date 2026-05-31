function formatMoney(amount) {
    return amount.toLocaleString("vi-VN");
}

function createCart() {
    let items = [];
    let discountPercent = 0;
    let fixedDiscount = 0;

    function getSubtotal() {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    function getTotal() {
        const subtotal = getSubtotal();
        const afterPercent = subtotal * (1 - discountPercent);
        return Math.max(0, afterPercent - fixedDiscount);
    }

    return {
        addItem(product, quantity = 1) {
            const existing = items.find((item) => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity,
                });
            }
        },

        removeItem(productId) {
            items = items.filter((item) => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find((i) => i.id === productId);
            if (item) item.quantity = newQuantity;
        },

        getTotal,

        applyDiscount(code) {
            discountPercent = 0;
            fixedDiscount = 0;
            switch (code) {
                case "SALE10":
                    discountPercent = 0.1;
                    break;
                case "SALE20":
                    discountPercent = 0.2;
                    break;
                case "FREESHIP":
                    fixedDiscount = 30000;
                    break;
                default:
                    break;
            }
        },

        printCart() {
            const border = "┌──────────────────────────────────────────────┐";
            const divider = "├──────────────────────────────────────────────┤";
            const footer = "└──────────────────────────────────────────────┘";

            console.log(border);
            console.log(
                "│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │"
            );

            items.forEach((item, index) => {
                const lineTotal = item.price * item.quantity;
                const num = String(index + 1).padStart(1);
                const name = item.name.padEnd(14);
                const qty = String(item.quantity).padStart(2);
                const unit = formatMoney(item.price).padStart(11);
                const total = formatMoney(lineTotal).padStart(11);
                console.log(
                    `│ ${num} │ ${name} │ ${qty} │ ${unit}  │ ${total}  │`
                );
            });

            console.log(divider);
            const totalStr = formatMoney(getTotal()) + "đ";
            console.log(
                `│ Tổng cộng:                       ${totalStr.padStart(12)} │`
            );
            console.log(footer);
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
            discountPercent = 0;
            fixedDiscount = 0;
        },
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());

module.exports = { createCart };
