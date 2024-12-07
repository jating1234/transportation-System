const firebaseConfig = {
    apiKey: "AIzaSyDh-WTZi3YRaAi0rPQwH8XTpzCxq9WpPFk",
    authDomain: "online-transportation-sy-e3c72.firebaseapp.com",
    databaseURL: "https://online-transportation-sy-e3c72-default-rtdb.firebaseio.com",
    projectId: "online-transportation-sy-e3c72",
    storageBucket: "online-transportation-sy-e3c72.firebasestorage.app",
    messagingSenderId: "147322770859",
    appId: "1:147322770859:web:bcdbe2f3d9dbb0d3812eee",
    measurementId: "G-700BE7GWV0"
  };

firebase.initializeApp(firebaseConfig);

// Reference message collection
var messagesRef = firebase.database().ref('messages');


function validateForm(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Basic validation
  if (username.trim() === "") {
    alert("Please enter a username");
    return false;
  }

  if (password.trim() === "") {
    alert("Please enter a password");
    return false;
  }

  // Here you would typically make an API call to verify credentials
  // For demonstration, let's just show how you might handle a successful login
  handleLogin(username, password);
}

function handleLogin(username, password) {
  // This is where you would normally make an API call to your backend
  // For demonstration purposes, we'll just simulate a login

  // Example of how you might handle a successful login:
  alert("Login successful!");
  // Redirect to dashboard or home page
  window.location.href = "first.html";

  // Example of how you might handle a failed login:
  // alert('Invalid username or password');
}

// Optional: Add event listener for Enter key
document
  .getElementById("password")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector('button[type="submit"]').click();
    }
  });

// <!-- Add this script section just before the closing </body> tag -->

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      handleRegistration();
    }
  });

  function validateForm() {
    // Name validation
    const firstName = document.getElementById("First").value.trim();
    const lastName = document.getElementById("Last").value.trim();
    if (firstName.length < 2 || lastName.length < 2) {
      alert("First and Last names must be at least 2 characters long");
      return false;
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    // Username validation
    const username = document.getElementById("username-reg").value.trim();
    if (username.length < 4) {
      alert("Username must be at least 4 characters long");
      return false;
    }

    // Password validation
    const password = document.getElementById("password-reg").value;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character"
      );
      return false;
    }

    // Phone number validation
    const phone = document.querySelector('input[type="tel"]').value;
    if (phone.length < 10 || phone.length > 15) {
      alert("Phone number must be between 10 and 15 digits");
      return false;
    }

    // Aadhar validation
    const aadhar = document.getElementById("Aadhar").value;
    if (aadhar.length !== 12) {
      alert("Aadhar number must be 12 digits");
      return false;
    }

    // Vehicle dimensions and weight validation
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const weight = parseFloat(document.getElementById("Weight").value);

    if (length <= 0 || width <= 0 || weight <= 0) {
      alert("Vehicle dimensions and weight must be greater than 0");
      return false;
    }

    // Driving license validation
    const licenseInput = document.querySelector(
      'input[pattern="[A-Z]{2}[0-9]{13}"]'
    ).value;
    const licensePattern = /^[A-Z]{2}[0-9]{13}$/;
    if (!licensePattern.test(licenseInput)) {
      alert(
        "Please enter a valid driving license number (Format: XX1234567890123)"
      );
      return false;
    }

    // File validation
    const aadharCard = document.getElementById("Aadhar card").files[0];
    //const drivingLicense = document.getElementById("Driving licence").files[0];
    const vehiclePaper = document.getElementById("Vehicle Paper").files[0];

    if (!aadharCard) {
      alert("Please upload your Aadhar card");
      return false;
    }

    // File size validation (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (aadharCard && aadharCard.size > maxSize) {
      alert("Aadhar card file size should be less than 5MB");
      return false;
    }

    return true;
  }

  function handleRegistration() {
    // Here you would typically send the form data to your server
    // For demonstration, we'll just show a success message
    alert("Registration successful! Your form has been submitted.");
    form.reset();
  }

  // Real-time password strength indicator
  const passwordInput = document.getElementById("password-reg");
  passwordInput.addEventListener("input", function () {
    const password = this.value;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;

    const strengthText = [
      "Very Weak",
      "Weak",
      "Medium",
      "Strong",
      "Very Strong",
    ];
    if (password.length > 0) {
      alert(`Password Strength: ${strengthText[strength - 1]}`);
    }
  });

  // File type validation
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".png"];
        const fileExtension = "." + file.name.split(".").pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
          alert(
            "Invalid file type. Please upload PDF, DOC, DOCX, JPG, or PNG files only."
          );
          this.value = "";
        }
      }
    });
  });
});
