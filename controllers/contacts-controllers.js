const contactsService = require("../models/contacts");

const { HttpError } = require("../helpers");

const {ctrlWrapper} = require("../utils");

  const getAllContacts = async (req, res) => {
      const result = await contactsService.listContacts();
      res.status(200).json(result);
  }

  const getContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await contactsService.getContactById(contactId);
      if (!result) {
        throw HttpError(404, `Not found`);
      }
      res.status(200).json(result);
  }

  const addContact =  async (req, res) => {
      const result = await contactsService.addContact(req.body);
      res.status(201).json(req.body);
  }

  const deleteContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await contactsService.removeContact(contactId);
      if (!result) {
        throw HttpError(404, `Movie with ${contactId} not found`);
      }
      res.json({
        message: "Delete success",
      });
  }

  const updateContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await contactsAddSchema.updateContact(contactId, req.body);
      if (!result) {
        throw HttpError(404, `Movie with ${contactId} not found`);
      }
      res.json(result);
  }

  module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContact: ctrlWrapper(getContact),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact)
  }