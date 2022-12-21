const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
const addFormats = require("ajv-formats");
addFormats(ajv);
require("ajv-errors")(ajv);

const updateUserDto = {
  type: "object",
  properties: {
    name: { type: "string" },
    username: { type: "string" },
    email: { type: "string", format: "email" },
    photo: { type: "string" },
  },
  required: ["name", "username", "email", "photo"],
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

const changePasswordDto = {
  type: "object",
  properties: {
    oldPassword: { type: "string" },
    newPassword: { type: "string" },
    confirmNewPassword: { type: "string" },
  },
  required: ["oldPassword", "newPassword", "confirmNewPassword"],
  additionalProperties: false,
};

const validateUpdateUser = ajv.compile(updateUserDto);
const validateChangePassword = ajv.compile(changePasswordDto);

module.exports = {
  validateUpdateUser: validateUpdateUser,
  validateChangePassword: validateChangePassword,
};
