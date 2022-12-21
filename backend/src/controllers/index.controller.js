class IndexController {
  index = (req, res) => {
    try {
      return res.status(200).send({
        message: "Hello, server is running",
      });
    } catch (error) {
      return res.status(404).send({
        message: error,
      });
    }
  };
}

module.exports = IndexController;
