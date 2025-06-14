document.addEventListener("DOMContentLoaded", function () {
    const buyButtons = document.querySelectorAll(".buy_button");

    buyButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const udidInputId = button.getAttribute("data-udid");
            const udidInput = document.getElementById(udidInputId);

            if (!udidInput || udidInput.value.trim() === "") {
                event.preventDefault();
                alert("Vui lòng nhập UDID trước khi mua hàng!");
                return;
            }

            const productName = button.getAttribute("data-name");
            const productPrice = button.getAttribute("data-price");
            const udid = udidInput.value.trim();

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ id: Date.now(), name: productName, price: productPrice, udid: udid });
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`Bạn đã mua "${productName}" với UDID: ${udid}. Chuyển hướng sang giỏ hàng...`);
            window.location.href = "cart.html";
        });
    });
});
