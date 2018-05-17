const required = value => {
  return value ? undefined : 'Required';
};

const maxLength = max => value => {
  return value && value.length > max ? `Must be ${max} characters or less` : undefined;
};

const maxLength15 = maxLength(15);

const minLength = min => value => {
  return value && value.length < min ? `Must be at least ${min} characters long` : undefined;
};

const minLength8 = minLength(8);

const email = value => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
};


// password requirements:

const atLeastOneUpperCaseLetter = value => value && !/^(?=.*[A-Z])/.test(value) ? 'Password must contain at least one uppercase letter' : undefined;

const atLeastOneLowerCaseLetter = value => value && !/^(?=.*[a-z])/.test(value) ? 'Password must contain at least one lowercase letter' : undefined;

const atLeastOneNumber = value => value && !/^(?=.*[0-9])/.test(value) ? 'Password must contain at least one number' : undefined;

const atLeastOneSpecialCharacter = value => value && !/^(?=.*?[#?!@$%^&*-])/.test(value) ? 'Password must contain at least one special character' : undefined;

exports.required = required;
exports.maxLength15 = maxLength15;
exports.minLength8 = minLength8;
exports.email = email;
exports.atLeastOneUpperCaseLetter = atLeastOneUpperCaseLetter;
exports.atLeastOneLowerCaseLetter = atLeastOneLowerCaseLetter;
exports.atLeastOneNumber = atLeastOneNumber;
exports.atLeastOneSpecialCharacter = atLeastOneSpecialCharacter;