const { ctrlWrapper } = require("../../utils");

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
  
    res.json({
      email,
      subscription,
    });
  };

module.exports = { getCurrent: ctrlWrapper(getCurrent) }