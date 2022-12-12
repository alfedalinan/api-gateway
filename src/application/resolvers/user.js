
async function getAllUsers(parent, args, context, info) {
    // Returns sample data
    return [{
        id: 1,
        name: 'David Goliath',
        age: 25
    }]
}

module.exports = {
    Query: {
        getAllUsers
    }
}