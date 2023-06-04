const User = require("./schemas/users-schema");

const register = (body) => {
    return User.create(body)
}

const addToken = (id, token) => {
    return User.findByIdAndUpdate(id, {token})
}

const removeToken = (id) => {
    return User.findByIdAndUpdate(id, {token: ''})
}

const findUserById = (id) => {
    return User.findById({_id: id})
}

const findUserByEmail = ({email}) => {
    return User.findOne({email: email})
}

module.exports = {
    register,
    addToken,
    removeToken,
    findUserByEmail,
    findUserById
}