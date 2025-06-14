document.addEventListener("DOMContentLoaded", function () {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let editIndex = null;

    function renderProducts() {
        const tableBody = document.querySelector("#product-table tbody");
        tableBody.innerHTML = "";
        products.forEach((product, index) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${product.device}</td>
                    <td>${product.name}</td>
                    <td>${product.wait}</td>
                    <td>${product.warranty}</td>
                    <td>${product.use}</td>
                    <td>${product.price} VND</td>
                    <td>
                        <button onclick="editProduct(${index})">Sửa</button>
                        <button onclick="deleteProduct(${index})">Xóa</button>
                    </td>
                </tr>`;
        });
    }

    function renderOrders() {
        const tableBody = document.querySelector("#order-table tbody");
        tableBody.innerHTML = "";
        orders.forEach((order, index) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${order.name}</td>
                    <td>${order.udid}</td>
                    <td>${order.status}</td>
                    <td>
                        <button onclick="changeOrderStatus(${index})">Xác nhận</button>
                        <button onclick="deleteOrder(${index})">Xóa</button>
                    </td>
                </tr>`;
        });
    }

    window.showAddProductForm = function () {
        document.getElementById("product-form").style.display = "block";
    };

    document.getElementById("addProductBtn").addEventListener("click", function () {
        addProduct();
    });

    window.addProduct = function () {
        const device = document.getElementById("productDevice").value.trim();
        const name = document.getElementById("productName").value.trim();
        const wait = document.getElementById("productWait").value.trim();
        const warranty = document.getElementById("productWarranty").value.trim();
        const use = document.getElementById("productUse").value.trim();
        const price = document.getElementById("productPrice").value.trim();

        if (!device || !name || !wait || !warranty || !use || !price) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        products.push({ device, name, wait, warranty, use, price });
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();

        document.getElementById("productDevice").value = "";
        document.getElementById("productName").value = "";
        document.getElementById("productWait").value = "";
        document.getElementById("productWarranty").value = "";
        document.getElementById("productUse").value = "";
        document.getElementById("productPrice").value = "";
    };

    window.editProduct = function (index) {
        editIndex = index;

        document.getElementById("editProductDevice").value = products[index].device;
        document.getElementById("editProductName").value = products[index].name;
        document.getElementById("editProductWait").value = products[index].wait;
        document.getElementById("editProductWarranty").value = products[index].warranty;
        document.getElementById("editProductUse").value = products[index].use;
        document.getElementById("editProductPrice").value = products[index].price;

        document.getElementById("edit-product-form").style.display = "block"; 
    };

    document.getElementById("updateProductBtn").addEventListener("click", function () {
        if (editIndex !== null) {
            products[editIndex] = {
                device: document.getElementById("editProductDevice").value.trim(),
                name: document.getElementById("editProductName").value.trim(),
                wait: document.getElementById("editProductWait").value.trim(),
                warranty: document.getElementById("editProductWarranty").value.trim(),
                use: document.getElementById("editProductUse").value.trim(),
                price: document.getElementById("editProductPrice").value.trim()
            };

            localStorage.setItem("products", JSON.stringify(products));
            renderProducts();
            hideEditForm();
        }
    });

    window.hideEditForm = function () {
        document.getElementById("edit-product-form").style.display = "none";
    };

    window.deleteProduct = function (index) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
    };

    window.changeOrderStatus = function (index) {
        if (!orders[index]) {
            alert("Đơn hàng không tồn tại!");
            return;
        }

        orders[index].status = "Đã xác nhận";
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders();
    };

    window.deleteOrder = function (index) {
        orders = orders.filter((_, i) => i !== index);
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders();
    };

    renderProducts();
    renderOrders();
});
