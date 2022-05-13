'use strict';

const utilities = {
    getErrorResponseBody: (statusCode, error, message, path) => {
        return {
            'status': statusCode,
            'error': error,
            'message': message,
            'path': path
        }
    },

    validateSchema: async (schema, body) => {
        let validate = schema.validate(body, { abortEarly: false });
        if (validate.error) {
            const errorDetails = validate.error.details.map(error => error.message);
            return {error: errorDetails};
        }
        return {error: false};
    }
};

module.exports = utilities;