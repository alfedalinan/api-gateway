const { GraphQLError } = require('graphql')
const { httpStatus } = require('./constants')


const formatError = (error) => {
    const { message, extensions } = error
    
    let errorBody = {}

    if (extensions.code === 'GRAPHQL_VALIDATION_FAILED' || extensions.code === 'BAD_USER_INPUT') {
      errorBody = {
        message: 'Graphql validation or bad user input',
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }

      return {
        statusCode: httpStatus.BAD_GATEWAY,
        headers: {},
        body: JSON.stringify(errorBody, null, 2),
        errors: errorBody
      }
    }
    else if (extensions.code === 'UNAUTHENTICATED') {
      errorBody = {
        message,
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }

      return {
        statusCode: httpStatus.UNAUTHORIZED,
        headers: {},
        body: JSON.stringify(errorBody, null, 2),
        errors: errorBody
      }
    }
    else if (extensions.code === 'GRAPHQL_PARSE_FAILED') {
      errorBody = {
        message: 'Parse failed',
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }
      
      return {
        statusCode: httpStatus.BAD_REQUEST,
        headers: {},
        body: JSON.stringify(errorBody, null, 2),
        errors: errorBody
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
          return {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            headers: response.http.headers,
            body: JSON.stringify({
              details: error.message,
              extensions: {
                  code: error.extensions.code
              }
            }, null, 2)
          }
        }
      }
    }

    return {
      statusCode: httpStatus.OK,
      headers: {},
      body: JSON.stringify(response.data, null, 2),
      data: response.data
    }
}

module.exports = { formatError, formatResponse }