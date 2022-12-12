const { GraphQLError } = require('graphql')

const formatError = (error) => {
    const { message, extensions } = error
    
    if (extensions.code === 'GRAPHQL_VALIDATION_FAILED' || extensions.code === 'BAD_USER_INPUT') {
      return {
        message: 'Graphql validation or bad user input',
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }
    }
    else if (extensions.code === 'UNAUTHENTICATED') {
      return {
        message,
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }
    }
    else if (extensions.code === 'GRAPHQL_PARSE_FAILED') {
      return {
        message: 'Parse failed',
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }
    }
    else {
      return error
    }
}

const formatResponse = (response) => {
    const { errors } = response
    if (errors) {
      for (let i = 0; i < errors.length; i++) {
        const error = errors[i];
        
        if (error.extensions.code === 'INTERNAL_SERVER_ERROR') {
          throw new GraphQLError('Internal Server Error', {
            details: error.message,
            extensions: {
                code: error.extensions.code
            }
          })
        }
      }
    }

    return response
}

module.exports = { formatError, formatResponse }