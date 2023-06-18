const { Contacts } = require("../../service");

const HttpError = require("../../helpers");

const { ctrlWrapper } = require("../../utils");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.removeContact(contactId);
  if (!result) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = { deleteContact: ctrlWrapper(deleteContact) };
