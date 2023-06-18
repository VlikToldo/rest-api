const { Contacts } = require("../../service");

const { ctrlWrapper } = require("../../utils");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contacts.listContacts({ owner, skip, limit });
  res.status(200).json(result);
};

module.exports = { getAllContacts: ctrlWrapper(getAllContacts) };
