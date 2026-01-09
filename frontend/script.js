const API = "http://localhost:5000";

const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("registerError");

if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    registerError.textContent = "";

    const user = {
      fullName: document.getElementById("fullName").value.trim(),
      age: document.getElementById("age").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      pincode: document.getElementById("pincode").value.trim(),
      password: document.getElementById("password").value.trim(),
    };

    if (!user.fullName || !user.email || !user.password) {
      registerError.textContent = "Please fill required fields";
      return;
    }

    try {
      const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        registerError.textContent = data.message;
        return;
      }

      localStorage.setItem("lastLoginId", user.email);
      window.location.href = "login.html";
    } catch (err) {
      registerError.textContent = "Server error";
    }
  });
}

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {
  const savedLoginId = localStorage.getItem("lastLoginId");
  if (savedLoginId) {
    document.getElementById("loginId").value = savedLoginId;
  }
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    loginError.textContent = "";

    const loginId = document.getElementById("loginId").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!loginId || !password) {
      loginError.textContent = "Enter login details";
      return;
    }

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        loginError.textContent = data.message;
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "dashboard.html";
    } catch (err) {
      loginError.textContent = "Server error";
    }
  });
}

const nameEl = document.getElementById("dFullName");

if (nameEl) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("dFullName").textContent = user.fullName;
    document.getElementById("dAge").textContent = user.age;
    document.getElementById("dPhone").textContent = user.phone;
    document.getElementById("dEmail").textContent = user.email;
    document.getElementById("dAddress").textContent = user.address;
    document.getElementById("dPincode").textContent = user.pincode;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.clear();
      window.location.href = "login.html";
    });
  }
}
