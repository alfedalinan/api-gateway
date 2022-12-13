const { ApolloServer } = require('apollo-server-lambda')
const resolvers = require('../application/resolvers')
const typeDefs = require('../application/typedefs')
const { formatError, formatResponse } = require('../application/lib/formatters')

const server = new ApolloServer({
    resolvers,
    typeDefs,
    formatError,
    introspection: true,
    formatResponse
})

module.exports = {
    process: server.createHandler()
}