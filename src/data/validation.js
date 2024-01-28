export function validateCustomerName(name, errorElement, inputElement, isSubmitAttempted) {
  let isValid = true;
  let errorMessage = '';

  const nameRegex = /^[a-zA-Z ]+$/; // Solo lettere e spazi

  if (name.length === 0) {
    errorMessage = 'Name is required.';
    isValid = false;
  } else if (name.length < 2) {
    errorMessage = 'Name must be at least 2 characters.';
    isValid = false;
  } else if (name.length > 50) {
    errorMessage = 'Name must be less than 50 characters.';
    isValid = false;
  } else if (!nameRegex.test(name)) {
    errorMessage = 'Name cannot contain special characters.';
    isValid = false;
  }

  // Aggiornare lo stile del bordo in base alla validità
  let borderColor = isValid ? 'green' : 'orange';
  if (!isValid && isSubmitAttempted) {
    borderColor = 'red';
    $(errorElement).text(errorMessage);
  } else {
    $(errorElement).text('');
  }

  $(inputElement).css('border', `2px solid ${borderColor}`);

  return isValid;
}


export function validateCustomerAddress(address, errorElement, inputElement, isSubmitAttempted) {
  let isValid = true;
  let errorMessage = '';

  if (address.length === 0) {
    errorMessage = 'Address is required.';
    isValid = false;
  } else if (address.length < 5) {
    errorMessage = 'Address must be at least 5 characters.';
    isValid = false;
  } else if (address.length > 200) {
    errorMessage = 'Address must be less than 200 characters.';
    isValid = false;
  }

  // Aggiornare lo stile del bordo in base alla validità
  let borderColor = isValid ? 'green' : 'orange';
  if (!isValid && isSubmitAttempted) {
    borderColor = 'red';
    $(errorElement).text(errorMessage);
  } else {
    $(errorElement).text('');
  }

  $(inputElement).css('border', `2px solid ${borderColor}`);

  return isValid;
}


export function validateCustomerEmail(email, errorElement, inputElement, isSubmitAttempted) {
  let isValid = true;
  let errorMessage = '';

  // Regex per la validazione dell'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length === 0) {
    errorMessage = 'Email is required.';
    isValid = false;
  } else if (!emailRegex.test(email)) {
    errorMessage = 'Please enter a valid email.';
    isValid = false;
  } else if (email.length > 100) {
    errorMessage = 'Email must be less than 100 characters.';
    isValid = false;
  }

  // Aggiornare lo stile del bordo in base alla validità
  let borderColor = isValid ? 'green' : 'orange';
  if (!isValid && isSubmitAttempted) {
    borderColor = 'red';
    $(errorElement).text(errorMessage);
  } else {
    $(errorElement).text('');
  }

  $(inputElement).css('border', `2px solid ${borderColor}`);

  return isValid;
}


export function validateCustomerPhone(phoneNumber, errorElement, inputElement, isSubmitAttempted) {
  let isValid = true;
  let errorMessage = '';

  // Permette cifre, spazi, parentesi e trattini
  const phoneRegex = /^[0-9+\s]+$/;

  if (phoneNumber.length < 7 || phoneNumber.length > 10) {
    errorMessage = 'Phone number must be between 7 and 10 digits.';
    isValid = false;
  } else if (!phoneRegex.test(phoneNumber)) {
    errorMessage = 'Phone number contains invalid characters.';
    isValid = false;
  }

  // Aggiornare lo stile del bordo in base alla validità
  let borderColor = isValid ? 'green' : 'orange';
  if (!isValid && isSubmitAttempted) {
    borderColor = 'red';
    $(errorElement).text(errorMessage);
  } else {
    $(errorElement).text('');
  }

  $(inputElement).css('border', `2px solid ${borderColor}`);

  return isValid;
}