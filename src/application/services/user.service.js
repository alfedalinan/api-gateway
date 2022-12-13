

async function getAll() {
    // Returns sample data
    return [{
        id: 1,
        name: 'David Goliath',
        age: 25
    }]
}

async function getById(id) {
    // Returns sample data
    return {
        id,
        name: 'Dave Gol',
        age: 25
    }
}

async function create(data) {
    return data
}

async function update(id, data) {
    // Returns sample data
    return {
        id: 1,
        ...data
    }
}

async function remove(id) {
    // Returns sample data
    return true
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}