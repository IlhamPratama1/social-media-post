const { config } = require("dotenv");
config({ path: ".env" });

const CREDENTIALS = process.env.CREDENTIALS === "true";
const { PORT, SECRET_KEY, ORIGIN } = process.env;

module.exports = CREDENTIALS;
module.exports = { PORT, SECRET_KEY, ORIGIN };
