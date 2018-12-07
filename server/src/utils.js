const axios = require("axios");

const namifyEmail = email => {
  return email.replace(/\./g, "").replace(/\100/g, "");
};

const verifyCaptcha = async captcha => {
  const res = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${captcha}`);
  if (res.data.success) {
    return true;
  }
  return false;
};

module.exports = {
  namifyEmail,
  verifyCaptcha
};
