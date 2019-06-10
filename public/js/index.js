$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.register");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");
  var phoneNumberInput = $("input#phone-input");
  var roleInput = $("input#role-input");


  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log("click click boom")
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      phoneNumber: phoneNumberInput.val().trim(),
      role: roleInput.val().trim()
    };
    console.log(userData);
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.phoneNumber || !userData.role) {
      return;
    }
    // If we have all the required fields, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.firstName, userData.lastName, userData.phoneNumber, userData.role);
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    phoneNumberInput.val("");
    roleInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName, phoneNumber, role) {
    $.post("/api/user", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      role: role
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});


