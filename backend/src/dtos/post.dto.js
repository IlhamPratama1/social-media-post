const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
const addFormats = require("ajv-formats");
addFormats(ajv);
require("ajv-errors")(ajv);

const createPostDto = {
  type: "object",
  properties: {
    image: { type: "string", minLength: 1 },
    caption: { type: "string", minLength: 1 },
    tags: { type: "string", minLength: 1 },
  },
  required: ["image", "caption", "tags"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: "Invalid data",
    additionalProperties: "Invalid data",
    properties: {
      image: "Invalid data",
      caption: "Invalid data",
      tags: "Invalid data",
    },
  },
};
const validateCreatePost = ajv.compile(createPostDto);

module.exports = {
  validateCreatePost: validateCreatePost,
};
