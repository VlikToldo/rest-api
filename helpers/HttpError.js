const messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict"
}

class HttpError extends Error {
    constructor(status, message = messages[status]){
        super(message);
        this.name = 'Error'
        this.status = status;
    }
}

// const HttpError = (status, message = messages[status]) => {
//     const error = new Error(message);
//     error.status = status;
//     return error;
// }

module.exports = HttpError;