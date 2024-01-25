export function validateName(name) {
  const nameRegex = /^[a-zA-Z ]+$/; // Solo lettere e spazi
  return name.length >= 3 && name.length <= 50 && nameRegex.test(name);
}


