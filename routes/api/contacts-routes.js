const express = require("express");

const {
    getAllContacts,
    getContact,
    addContact,
    deleteContact,
    updateContact,
    updateStatusContact
} = require("../../controllers/contacts-controllers");

const {contactsAddSchema, contactUpdateStatus} = require("../../schema/contacts-schema");
const {validateBody} = require("../../utils");
const {authenticate} = require('../../middlewares');

const router = express.Router();

router.use(authenticate);

router.get("/", getAllContacts);

router.get("/:contactId", getContact);

router.post("/", validateBody(contactsAddSchema), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(contactsAddSchema), updateContact);

router.patch('/:contactId/favorite', validateBody(contactUpdateStatus), updateStatusContact);

module.exports = router;
