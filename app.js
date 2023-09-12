"use strict";

const hamburgerToggle = document.querySelector(".hamburger");

function myFunction() {
  var x = document.querySelector(".myLinks");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
    x.classList.toggle("change");
  }
}
hamburgerToggle.addEventListener("click", myFunction);

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  mystickyFunction();
};

// Get the navbar
const navbar = document.querySelector(".top-link");
// Get the offset position of the navbar
const sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function mystickyFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
// this function will set the option

// Validating form
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const textarea = document.getElementById("mytextarea");

const form = document.getElementById("submit");

const sucessSubmit = document.querySelector(".sucess-submit");

const formElem = document.querySelector("form");
// formElem.addEventListener("submit", (e) => {
//   // on form submission, prevent default
//   e.preventDefault();

//   // construct a FormData object, which fires the formdata event
//   new FormData(formElem);
//   console.log(formElem);
// });

function callbackFunction() {
  const form = document.getElementById("submit");
  const submitter = document.querySelector("first-set input[value=save]");
  const formData = new FormData(form, submitter);
  console.log(formData);

  for (const [key, value] of formData) {
    console.log(`${key}: ${value}\n`);
    let link =
      `mailto:${email.value}` +
      "?cc=myCCaddress@example.com" +
      "&subject= " +
      `${subject.value}` +
      "&body=" +
      `${textarea.value}` +
      "Regards" +
      "" +
      `${firstname.value}` +
      `${lastname.value}` +
      `${phone.value}`;
    window.location.href = link;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isUsernameValid = checkName(),
    isLastnameValid = checkLastName(),
    isEmailValid = checkEmail(),
    isPhoneValid = checkPhone(),
    isSubjectValid = checkSubject(),
    isTextareaValid = checkTextArea();

  let isFormValid =
    isUsernameValid &&
    isLastnameValid &&
    isEmailValid &&
    isPhoneValid &&
    isSubjectValid &&
    isTextareaValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    callbackFunction();

    sucessSubmit.innerText =
      "Thank you your message have been sucessifuly submited!";
  }
});

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (lenght, min, max) =>
  lenght < min || lenght > max ? false : true;

const isEmailValid = (email) => {
  const re = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  return re.test(email);
};
const isPhoneSecure = (phone) => {
  const re = new RegExp(
    /(^\+(?!44)[0-9]{7,15}$)|(^(\+440?|0)(([27][0-9]{9}$)|(1[1-9][0-9]{7,8}$)))/
  );
  return re.test(phone);
};

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkName = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = firstname.value.trim();

  if (!isRequired(username)) {
    showError(firstname, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      firstname,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(firstname);
    valid = true;
  }
  return valid;
};

const checkLastName = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const lname = lastname.value.trim();

  if (!isRequired(lname)) {
    showError(lastname, "Username cannot be blank.");
  } else if (!isBetween(lname.length, min, max)) {
    showError(
      lastname,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(lastname);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const emailValue = email.value.trim();
  if (!isRequired(emailValue)) {
    showError(email, "Email cannot be blank.");
  } else if (!isEmailValid(emailValue)) {
    showError(email, "Email is not valid.");
  } else {
    showSuccess(email);
    valid = true;
  }
  return valid;
};
const checkPhone = () => {
  let valid = false;
  const phoneValue = phone.value.trim();
  if (!isRequired(phoneValue)) {
    showError(phone, "Mobile cannot be blank.");
  } else if (!isPhoneSecure(phoneValue)) {
    showError(phone, "Mobile number is not valid.");
  } else {
    showSuccess(phone);
    valid = true;
  }
  return valid;
};
const checkSubject = () => {
  let valid = false;
  const subjectValue = subject.value.trim();
  if (!isRequired(subjectValue)) {
    showError(subject, "Username cannot be blank.");
  } else {
    showSuccess(subject);
    valid = true;
  }
  return valid;
};
const checkTextArea = () => {
  let valid = false;
  const textareaValue = textarea.value.trim();
  if (!isRequired(textareaValue)) {
    showError(textarea, "Message cannot be blank.");
  } else {
    showSuccess(textarea);
    valid = true;
  }
  return valid;
};

function validate(inputElement) {
  console.log("validate() called for inputElement:", inputElement);

  if (!inputElement) {
    // This error may be caused by calling document.getElementById()
    // but there is no HTML element with the id attribute value you provide
    alert("validate() called with no input element");
    return false;
  }

  var feedbackElement = document.getElementById("feedback_" + inputElement.id);
  if (!feedbackElement) {
    // This error may be caused by adding an input with e.g. id="boop"
    // but no matching feedback element with e.g. id="feedback_boop"
    alert(
      "validate() called but there is no element to provide feedback for this input (see console)"
    );
    return false;
  }
}

// // Function to send form data and process the text response
// function postFormData(event) {
//   // Prevent the button click from submitting the form
//   // This is like returning false to prevent an invalid form submitting
//   event.preventDefault();
//   var formElement = document.querySelector("form input");
//   console.log(formElement);
//   var data = new FormData(formElement);
//   console.log(data);
//   fetch("/", {
//     method: "POST",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//     },
//     body: data,
//   });
// }

// function initialize() {
//   // Connect the Send button
//   var sendButton = document.querySelector(".regular-button");
//   console.log(sendButton);
//   sendButton.addEventListener("click", postFormData);
// }
