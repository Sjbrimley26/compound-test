require("dotenv").config();
const AWS = require("aws-sdk");
const { promisify } = require("util");

const s3 = new AWS.S3();

const getObject = promisify(s3.getObject.bind(s3));
const putObject = promisify(s3.putObject.bind(s3));

const Bucket = "compound-test-storage";

const { namifyEmail } = require("./utils");

const checkForExistingEmail = async email => {
  const params = {
    Bucket,
    Key: `${namifyEmail(email)}.json`
  };

  try {
    const data = await getObject(params);
    return true;
  } catch (err) {
    if (err.code === "NoSuchKey") {
      return false;
    } else {
      throw err;
    }
  }

};

const saveJSON = async data => {
  const params = {
    Bucket,
    Key: `${namifyEmail(data.emailAddress)}.json`,
    Body: JSON.stringify(data),
    ContentType: "application/json"
  };

  try {
    const returnedObj = await putObject(params);
    return true;
  } catch(err) {
    return false;
  }    
};

module.exports = {
  checkForExistingEmail,
  saveJSON
};

