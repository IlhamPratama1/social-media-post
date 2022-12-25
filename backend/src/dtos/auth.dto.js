const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
const addFormats = require("ajv-formats");
addFormats(ajv);
require("ajv-errors")(ajv);

const registerUserDto = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    username: { type: "string", minLength: 1 },
    email: { type: "string", format: "email", minLength: 1 },
    password: { type: "string", minLength: 1 },
    photo: { type: "string" },
  },
  required: ["name", "username", "email", "password"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: "Invalid data",
    additionalProperties: "Invalid data",
    properties: {
      name: "Invalid data",
      username: "Invalid data",
      password: "Invalid data",
      email: "You have entered invalid email address",
    },
  },
};

const loginUserDto = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 1 },
    password: { type: "string", minLength: 1 },
  },
  required: ["username", "password"],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: "Invalid data",
    type: "should be an object",
    required: "Invalid data",
    properties: {
      username: "Invalid data",
      password: "Invalid data",
    },
  },
};

const validateRegisterDto = ajv.compile(registerUserDto);
const validateLoginDto = ajv.compile(loginUserDto);

module.exports = {
  validateRegisterDto: validateRegisterDto,
  validateLoginDto: validateLoginDto,
};
