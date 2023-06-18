const { Contacts } = require("../../service");

const HttpError = require("../../helpers");

const { ctrlWrapper } = require("../../utils");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.updateStatusContact(contactId, req.body);
  if (!result) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }
  res.status(200).json(result);
};

module.exports = { updateStatusContact: ctrlWrapper(updateStatusContact) };
