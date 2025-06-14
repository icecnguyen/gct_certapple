document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("table");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector("button[type='submit']");

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "root" && password === "root") {
            localStorage.setItem("isAdmin", "true");
            alert("Đăng nhập thành công!");
            window.location.href = "admin.html";
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    });
});
