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

  const updateBtn = document.getElementById("updateProfileBtn");
  let isEditMode = false;

  if (updateBtn) {
    updateBtn.addEventListener("click", function () {
      const storedUser = localStorage.getItem("userData");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      if (!isEditMode) {
        document.getElementById("dFullName").style.display = "none";
        document.getElementById("dAge").style.display = "none";
        document.getElementById("dPhone").style.display = "none";
        document.getElementById("dEmail").style.display = "none";
        document.getElementById("dAddress").style.display = "none";
        document.getElementById("dPincode").style.display = "none";

        document.getElementById("editFullName").style.display = "block";
        document.getElementById("editAge").style.display = "block";
        document.getElementById("editPhone").style.display = "block";
        document.getElementById("editEmail").style.display = "block";
        document.getElementById("editAddress").style.display = "block";
        document.getElementById("editPincode").style.display = "block";

        document.getElementById("editFullName").value = user.fullName;
        document.getElementById("editAge").value = user.age;
        document.getElementById("editPhone").value = user.phone;
        document.getElementById("editEmail").value = user.email;
        document.getElementById("editAddress").value = user.address;
        document.getElementById("editPincode").value = user.pincode;

        updateBtn.textContent = "Update the Changes";
        isEditMode = true;
      } else {
        user.fullName = document.getElementById("editFullName").value.trim();
        user.age = document.getElementById("editAge").value.trim();
        user.phone = document.getElementById("editPhone").value.trim();
        user.email = document.getElementById("editEmail").value.trim();
        user.address = document.getElementById("editAddress").value.trim();
        user.pincode = document.getElementById("editPincode").value.trim();

        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("loginId", user.email || user.phone);

        document.getElementById("dFullName").textContent = user.fullName;
        document.getElementById("dAge").textContent = user.age;
        document.getElementById("dPhone").textContent = user.phone;
        document.getElementById("dEmail").textContent = user.email;
        document.getElementById("dAddress").textContent = user.address;
        document.getElementById("dPincode").textContent = user.pincode;

        document.getElementById("dFullName").style.display = "inline";
        document.getElementById("dAge").style.display = "inline";
        document.getElementById("dPhone").style.display = "inline";
        document.getElementById("dEmail").style.display = "inline";
        document.getElementById("dAddress").style.display = "inline";
        document.getElementById("dPincode").style.display = "inline";

        document.getElementById("editFullName").style.display = "none";
        document.getElementById("editAge").style.display = "none";
        document.getElementById("editPhone").style.display = "none";
        document.getElementById("editEmail").style.display = "none";
        document.getElementById("editAddress").style.display = "none";
        document.getElementById("editPincode").style.display = "none";

        updateBtn.textContent = "Update Profile";
        isEditMode = false;
      }
    });
  }

  const changePwdBtn = document.getElementById("changePasswordBtn");
  const passwordModal = document.getElementById("passwordModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  if (changePwdBtn) {
    changePwdBtn.addEventListener("click", function () {
      passwordModal.style.display = "flex";
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      passwordModal.style.display = "none";
    });
  }

  const savePasswordBtn = document.getElementById("savePasswordBtn");
  const passwordError = document.getElementById("passwordError");

  if (savePasswordBtn) {
    savePasswordBtn.addEventListener("click", function () {
      passwordError.textContent = "";

      const newPassword = document.getElementById("newPassword").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();
      const isConfirmed = document.getElementById("confirmChange").checked;

      if (!isConfirmed) {
        passwordError.textContent =
          "Please confirm before changing your password.";
        return;
      }

      if (!newPassword || !confirmPassword) {
        passwordError.textContent = "Please fill both password fields.";
        return;
      }

      if (newPassword !== confirmPassword) {
        passwordError.textContent = "Passwords do not match.";
        return;
      }

      const storedUser = localStorage.getItem("userData");
      if (!storedUser) {
        passwordError.textContent = "User not found.";
        return;
      }

      const user = JSON.parse(storedUser);

      user.password = newPassword;
      localStorage.setItem("userData", JSON.stringify(user));

      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
      document.getElementById("confirmChange").checked = false;

      passwordModal.style.display = "none";
    });
  }

  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "login.html";
  });
}
