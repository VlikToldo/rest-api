const { addContact } = require("./addContact");
const { getAllContacts } = require("./getAllContacts");
const { getContact } = require("./getContact");
const { updateContact } = require("./updateContact");
const { updateStatusContact } = require("./updateStatusContact");
const { deleteContact } = require("./deleteContact");

module.exports = {
    addContact,
    getAllContacts,
    getContact,
    updateContact,
    updateStatusContact,
    deleteContact
};