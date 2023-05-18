const express = require("express");

const contactsControllers = require("../../controllers/contacts-controllers");

const schemas = require("../../schema/contacts-schema");

const {validateBody} = require("../../utils");

const router = express.Router();

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", contactsControllers.getContact);

router.post("/", validateBody(schemas.contactsAddSchema), contactsControllers.addContact);

router.delete("/:contactId", contactsControllers.deleteContact);

router.put("/:contactId", validateBody(schemas.contactsAddSchema), contactsControllers.updateContact);

module.exports = router;
