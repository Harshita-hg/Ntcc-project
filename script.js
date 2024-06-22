document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("validatorText");
  const togglePassword = document.getElementById("togglePassword");
  const passwordCheckContainer = document.querySelector(".password-check-container");
  const togglePasswordCheckBtn = document.getElementById("togglePasswordCheck");

  const checkCriteria = [
    { regex: /.{8,}/, element: document.querySelector(".check-length img") },
    { regex: /[A-Z]/, element: document.querySelector(".check-uppercase img") },
    { regex: /[a-z]/, element: document.querySelector(".check-lowercase img") },
    { regex: /\d/, element: document.querySelector(".check-number img") },
    { regex: /[^A-Za-z0-9]/, element: document.querySelector(".check-special img") },
  ];

  const closeImgSrc = "images/close.png";
  const checkImgSrc = "images/check.png";
  const eyeOpenImgSrc = "images/eye-open.png";
  const eyeCloseImgSrc = "images/eye-close.png";

  let passwordChecksVisible = true;

  // Function to toggle visibility of password checks
  function togglePasswordChecks() {
    if (passwordChecksVisible) {
      passwordCheckContainer.style.display = "none";
      passwordChecksVisible = false;
    } else {
      passwordCheckContainer.style.display = "block";
      passwordChecksVisible = true;
    }
  }

  // Function to validate password
  function validatePassword(password) {
    let allCriteriaMet = true;

    checkCriteria.forEach(criteria => {
      if (criteria.regex.test(password)) {
        criteria.element.src = checkImgSrc;
      } else {
        criteria.element.src = closeImgSrc;
        allCriteriaMet = false;
      }
    });

    return allCriteriaMet;
  }

  // Event listener for password input
  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const allValid = validatePassword(password);

    if (!allValid && !passwordChecksVisible) {
      togglePasswordChecks();
    } else if (allValid && passwordChecksVisible) {
      togglePasswordChecks();
    }
  });

  // Event listener for toggle password checks button
  togglePasswordCheckBtn.addEventListener("click", () => {
    togglePasswordChecks();
  });

  // Event listener for toggle password visibility
  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.src = eyeOpenImgSrc;
    } else {
      passwordInput.type = "password";
      togglePassword.src = eyeCloseImgSrc;
    }
  });

  // Initially hide password checks
  togglePasswordChecks();
});
