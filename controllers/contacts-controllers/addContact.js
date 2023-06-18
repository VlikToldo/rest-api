const { Contacts } = require("../../service");

const { ctrlWrapper } = require("../../utils");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contacts.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = { addContact: ctrlWrapper(addContact) };
