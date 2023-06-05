const Contacts = require("./schemas/contacts-schema");

const listContacts = ({owner, skip, limit}) => {
    return Contacts.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
};

const getContactById = (id) => {
    return Contacts.findOne({_id: id});
};

const addContact = (body) => {
    return Contacts.create(body);
};

const removeContact = (id) => {
    return Contacts.findByIdAndRemove({_id: id});
};

const updateContact = (id, body) => {
    return Contacts.findByIdAndUpdate({_id: id}, body, {new: true});
};

const updateStatusContact = (id, body) => {
    return Contacts.findByIdAndUpdate({_id: id}, body, {new: true});
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}

