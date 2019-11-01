function validateForm() {
  let emailID = document.form.email.value;
  atpos = emailID.indexOf("@");
  dotpos = emailID.lastIndexOf(".");

  if (atpos < 1 || (dotpos - atpos < 2)) {
    alert("Please enter correct email ID")
    document.form.email.focus();
    return false;
  }
  return true;
}