const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
const addFormats = require("ajv-formats");
addFormats(ajv);
require("ajv-errors")(ajv);

const updateUserDto = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    username: { type: "string", minLength: 1 },
    email: { type: "string", format: "email", minLength: 1 },
    photo: { type: "string", minLength: 1 },
  },
  required: ["name", "username", "email", "photo"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: "Invalid data",
    additionalProperties: "Invalid data",
    properties: {
      email: "You have entered invalid email address",
      name: "Invalid data",
      username: "Invalid data",
      photo: "Invalid data",
    },
  },
};

const changePasswordDto = {
  type: "object",
  properties: {
    oldPassword: { type: "string", minLength: 1 },
    newPassword: { type: "string", minLength: 1 },
    confirmNewPassword: { type: "string", minLength: 1 },
  },
  required: ["oldPassword", "newPassword", "confirmNewPassword"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      oldPassword: "Invalid data",
      newPassword: "Invalid data",
      confirmNewPassword: "Invalid data",
    },
  },
};

const validateUpdateUser = ajv.compile(updateUserDto);
const validateChangePassword = ajv.compile(changePasswordDto);

module.exports = {
  validateUpdateUser: validateUpdateUser,
  validateChangePassword: validateChangePassword,
};
