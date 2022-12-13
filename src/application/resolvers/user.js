const userService = require('../services/user.service')

async function getAllUsers() {
    const result = await userService.getAll()
    return result
}

async function getUserById(parent, args, context, info) {
    const result = await userService.getById(args.id)
    return result
}

async function createUser(parent, args) {
    const result = await userService.create(args.data)
    return result
}

async function updateUser(parent, args) {
    const result = await userService.update(args.id, args.data)
    return result
}

async function removeUser(parent, args) {
    const result = await userService.remove(args.id)
    return result
}

module.exports = {
    Query: {
        getAllUsers,
        getUserById
    },
    Mutation: {
        createUser,
        updateUser,
        removeUser
    }
}