export function messageResponse(message, status = 200) {
    return {
        status,
        success: true,
        message,
        data: null
    };
}

export function dataResponse(message, data, status = 200) {
    return {
        status,
        success: true,
        message,
        data
    };
}

export function errorResponse(error, status = 500) {
    return {
        status,
        success: false,
        message: error?.message || error,
        data: null
    };
}
