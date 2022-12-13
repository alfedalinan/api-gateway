const readTypeDefs = require('../lib/read-typedefs')
const userTypeDefs = readTypeDefs(`${__dirname}/user`)
const { gql } = require('apollo-server-lambda') 

const typeDefs = gql`
    type Query
    type Mutation
    ${userTypeDefs}
`

module.exports = typeDefs