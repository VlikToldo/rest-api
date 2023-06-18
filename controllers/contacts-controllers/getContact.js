const { Contacts } = require("../../service");

const HttpError = require("../../helpers");

const { ctrlWrapper } = require("../../utils");

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.getContactById(contactId);
  if (!result) {
    throw new HttpError(404, `Not found`);
  }
  res.status(200).json(result);
};

module.exports = { getContact: ctrlWrapper(getContact) };
