const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
const addFormats = require("ajv-formats");
addFormats(ajv);
require("ajv-errors")(ajv);

const registerUserDto = {
  type: "object",
  properties: {
    name: { type: "string" },
    username: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    photo: { type: "string" },
  },
  required: ["name", "username", "email", "password"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: "Invalid data",
    additionalProperties: "Invalid data",
    properties: {
      email: "You have entered invalid email address",
    },
  },
};

const loginUserDto = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: "Invalid data",
    type: "should be an object",
    required: "Invalid data",
  },
};

const validateRegisterDto = ajv.compile(registerUserDto);
const validateLoginDto = ajv.compile(loginUserDto);

module.exports = {
  validateRegisterDto: validateRegisterDto,
  validateLoginDto: validateLoginDto,
};
