// REGISTER SECTION

const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("registerError");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    registerError.textContent = "";

    const fullName = document.getElementById("fullName").value.trim();
    const age = document.getElementById("age").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!fullName || !email || !password) {
      registerError.textContent = "Please fill required fields";
      return;
    }

    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      const existingUser = JSON.parse(savedUser);

      if (email === existingUser.email || phone === existingUser.phone) {
        registerError.textContent = "User already exists";
        return;
      }
    }

    const user = {
      fullName: fullName,
      age: age,
      phone: phone,
      email: email,
      address: address,
      pincode: pincode,
      password: password,
    };

    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("loginId", email || phone);

    window.location.href = "login.html";
  });
}

// LOGIN SECTION

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {
  const savedLoginId = localStorage.getItem("loginId");
  if (savedLoginId) {
    document.getElementById("loginId").value = savedLoginId;
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    loginError.textContent = "";

    const loginId = document.getElementById("loginId").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();

    if (!loginId || !loginPassword) {
      loginError.textContent = "Enter login details";
      return;
    }

    const storedUser = localStorage.getItem("userData");
    if (!storedUser) {
      loginError.textContent = "Account not found";
      return;
    }

    const user = JSON.parse(storedUser);

    const isValidUser =
      (loginId === user.email || loginId === user.phone) &&
      loginPassword === user.password;

    if (!isValidUser) {
      loginError.textContent = "Wrong email/phone or password";
      return;
    }

    window.location.href = "dashboard.html";
  });
}

// DASHBOARD SECTION

const nameEl = document.getElementById("dFullName");

if (nameEl) {
  const storedUser = localStorage.getItem("userData");

  if (!storedUser) {
    window.location.href = "login.html";
  } else {
    const user = JSON.parse(storedUser);

    document.getElementById("dFullName").textContent = user.fullName;
    document.getElementById("dAge").textContent = user.age;
    document.getElementById("dPhone").textContent = user.phone;
    document.getElementById("dEmail").textContent = user.email;
    document.getElementById("dAddress").textContent = user.address;
    document.getElementById("dPincode").textContent = user.pincode;
  }

  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "login.html";
  });
}
