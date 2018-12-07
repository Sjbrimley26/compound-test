require("dotenv").config();
const cors = require("cors");
const requestIp = require("request-ip");
const serverless = require("aws-serverless-express");

const {
  checkForExistingEmail,
  saveJSON
} = require("./aws");

const { verifyCaptcha } = require("./utils");

const binaryMimeTypes = [
  'application/octet-stream',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml'
];

const app = require("fastify")({
  serverFactory(handlerMethod) {
    return serverless.createServer(handlerMethod, null, binaryMimeTypes);
  }
});

app.options('*', cors());
app.use(cors());
app.use(requestIp.mw());

app.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.send({ err: "Incomplete form entry" });
    }
    const captchaVal = data["g-recaptcha-response"];

    const isValid = await verifyCaptcha(captchaVal);

    if (isValid === false) {
      return res.send({
        err: "Invalid captcha value"
      });
    }

    delete data["g-recaptcha-response"];

    const emailExists = await checkForExistingEmail(data.emailAddress);

    if (emailExists) {
      return res.send({
        err: "Email already exists in S3 storage!"
      });
    }
    
    const ipAddress = req.raw.clientIp;
    if (ipAddress === undefined) {
      return res.send({ err: "IP Address could not be retrieved!" });
    }

    const userAgent = req.headers['user-agent'];

    const s3Data = { ...data, userAgent, ipAddress };
    
    const savedSuccessfully = await saveJSON(s3Data);

    if (savedSuccessfully === false) {
      return res.send({ err: "Email was not saved to s3!" });
    }

    return res.send({
      message: "Success!"
    });


  } catch (err) {
    console.log("ERROR!", err);
  }
});

module.exports = app;
