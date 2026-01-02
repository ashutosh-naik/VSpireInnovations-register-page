// ----- Register -----

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
      const existing = JSON.parse(savedUser);
      if (email === existing.email || phone === existing.phone) {
        registerError.textContent = "User already exists";
        return;
      }
    }

    const user = {
      fullName,
      age,
      phone,
      email,
      address,
      pincode,
      password,
    };

    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("loginId", email || phone);

    window.location.href = "login.html";
  });
}

// ----- Login -----

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {
  const savedLogin = localStorage.getItem("loginId");
  if (savedLogin) {
    document.getElementById("loginId").value = savedLogin;
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

    const stored = localStorage.getItem("userData");
    if (!stored) {
      loginError.textContent = "Account not found";
      return;
    }

    const user = JSON.parse(stored);

    if (
      (loginId !== user.email && loginId !== user.phone) ||
      loginPassword !== user.password
    ) {
      loginError.textContent = "Wrong email/phone or password";
      return;
    }

    window.location.href = "dashboard.html";
  });
}

// ----- Dashboard -----

const nameEl = document.getElementById("dFullName");

if (nameEl) {
  const stored = localStorage.getItem("userData");

  if (!stored) {
    window.location.href = "login.html";
  } else {
    const user = JSON.parse(stored);

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
