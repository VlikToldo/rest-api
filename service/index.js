const Contacts = require("./schemas/contacts");

const listContacts = async () => {
    return Contacts.find()
}

const getContactById = async (id) => {
    return Contacts.findOne({_id: id})
}

const addContact = async (body) => {
    return Contacts.create(body)
}

const removeContact = async (id) => {
    return Contacts.findByIdAndRemove({_id: id})
}

const updateContact = async (id, body) => {
    return Contacts.findByIdAndUpdate({_id: id}, body, {new: true})
}

const updateStatusContact = async (id, body) => {
    return Contacts.findByIdAndUpdate({_id: id}, body, {new: true})
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}



