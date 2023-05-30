const service = require("../service")

const HttpError = require("../helpers");

const {ctrlWrapper} = require("../utils");

  const getAllContacts = async (req, res) => {
      const result = await service.listContacts();
      res.status(200).json(result);
  }

  const getContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await service.getContactById(contactId);
      if (!result) {
        throw HttpError(404, `Not found`);
      }
      res.status(200).json(result);
  }

  const addContact =  async (req, res) => {
      const result = await service.addContact(req.body);
      res.status(201).json(req.body);
  }

  const deleteContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await service.removeContact(contactId);
      if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
      }
      res.json({
        message: "Delete success",
      });
  }

  const updateContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await service.updateContact(contactId, req.body);
      if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
      }
      res.status(200).json(result);
  }

  const updateStatusContact = async (req, res) => {
    const {contactId} =req.params;
    const result = await service.updateStatusContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`)
    }
    res.status(200).json(result)
  }

  module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContact: ctrlWrapper(getContact),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact)
  }