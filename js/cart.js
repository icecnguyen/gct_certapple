document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart_none");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        if (cart.length === 0) {
            cartContainer.innerHTML = "";
        } else {
            cartContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <p>Giá: ${item.price} VND</p>
                    <p>UDID: ${item.udid}</p>
                    <div class="button_container">
                        <button class="remove-button" data-index="${index}">Xóa đơn</button>
                        <button class="pay-button" data-index="${index}">Thanh toán</button>
                    </div>
                </div>
            `).join("");
        }
    }

    renderCart();

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-button")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            alert("Đơn hàng đã được xóa!");
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("pay-button")) {
            const index = event.target.getAttribute("data-index");
            const product = cart[index];

            if (!product) return;

            cart.splice(index, 1);
            let paidCart = JSON.parse(localStorage.getItem("paidCart")) || [];
            paidCart.push(product);

            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("paidCart", JSON.stringify(paidCart));

            alert(`Bạn đã thanh toán thành công cho đơn hàng "${product.name}"!`);
            alert(`Thông tin về chứng chỉ sẽ được gửi về Email sau khi Apple duyệt đơn.`)
            renderCart();
        }
    });
});
