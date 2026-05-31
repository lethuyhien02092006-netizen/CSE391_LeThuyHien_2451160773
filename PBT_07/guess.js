(function () {
    const secret = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 7;
    const guessed = [];
    let attempts = 0;

    alert("Đoán số từ 1 đến 100! Bạn có tối đa " + maxAttempts + " lượt.");

    while (attempts < maxAttempts) {
        const input = prompt("Lượt " + (attempts + 1) + "/" + maxAttempts + " — Nhập số (1-100):");

        if (input === null) {
            alert("Bạn đã thoát game. Đáp án là: " + secret);
            return;
        }

        const num = Number(input);
        if (!Number.isInteger(num) || num < 1 || num > 100) {
            alert("Chỉ chấp nhận số nguyên từ 1 đến 100!");
            continue;
        }

        if (guessed.indexOf(num) !== -1) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }

        guessed.push(num);
        attempts++;

        if (num === secret) {
            alert("Đúng rồi! Bạn đoán đúng sau " + attempts + " lần!");
            return;
        }

        if (num < secret) {
            alert("Cao hơn!");
        } else {
            alert("Thấp hơn!");
        }
    }

    alert("Hết lượt! Bạn thua. Đáp án là: " + secret);
})();
