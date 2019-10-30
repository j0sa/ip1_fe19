function validateForm() {
  if (document.getElementById('name-form').value || document.getElementById('lname-form').value == "") {
    alert('You need to insert a name');
    return false;
  }
  let emailRegEx = /^[\w ]+$/;
  if (!emailRegEx.test(document.getElementById('email-form'))) {
    alert("Email contains invalid characters!");
    return false;
  }
  return true;
}