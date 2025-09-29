const requiredValidator = (value) => {
  return value.trim() !== '';
};

const minValidator = (value, min) => {
  return value.length >= min;
};

const maxValidator = (value, max) => {
  return value.length <= max;
};

const emailValidator = (value) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(value)
};

const usernameValidator = (value) => {
  const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
  return usernamePattern.test(value);
};

const emailOrUsernameValidator = (value) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/; // مثلا نام کاربری باید بین 3 تا 20 کاراکتر باشه و فقط شامل حروف، اعداد و "_" باشه

  if (emailPattern.test(value)) {
    return true;  // ایمیل معتبر است
  } else if (usernamePattern.test(value)) {
    return true;  // نام کاربری معتبر است
  } else {
    return false;  // نه ایمیل هست نه نام کاربری معتبر
  }
};



export default { requiredValidator, minValidator, maxValidator, emailValidator,usernameValidator, emailOrUsernameValidator };
