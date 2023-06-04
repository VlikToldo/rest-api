const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

const contacts = new Schemas({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schemas.Types.ObjectId,
    ref: 'users',
  }
},
{ versionKey: false, timestamps: true });

const Contacts = mongoose.model("contacts", contacts);

module.exports = Contacts;
