const {Contacts} = require("../service")

const HttpError = require("../helpers");

const {ctrlWrapper} = require("../utils");

  const getAllContacts = async (req, res) => {
      const {_id: owner} = req.user;
      const {page = 1, limit = 10} = req.query;
      const skip = (page - 1) * limit;
      const result = await Contacts.listContacts({owner, skip, limit});
      res.status(200).json(result);
  }

  const getContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contacts.getContactById(contactId);
      if (!result) {
        throw new HttpError(404, `Not found`);
      }
      res.status(200).json(result);
  }

  const addContact =  async (req, res) => {
      const {_id: owner} = req.user;
      const result = await Contacts.addContact({...req.body, owner});
      res.status(201).json(result);
  }

  const deleteContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contacts.removeContact(contactId);
      if (!result) {
        throw new HttpError(404, `Contact with ${contactId} not found`);
      }
      res.json({
        message: "Delete success",
      });
  }

  const updateContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contacts.updateContact(contactId, req.body);
      if (!result) {
        throw new HttpError(404, `Contact with ${contactId} not found`);
      }
      res.status(200).json(result);
  }

  const updateStatusContact = async (req, res) => {
    const {contactId} =req.params;
    const result = await Contacts.updateStatusContact(contactId, req.body);
    if (!result) {
      throw new HttpError(404, `Contact with ${contactId} not found`)
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