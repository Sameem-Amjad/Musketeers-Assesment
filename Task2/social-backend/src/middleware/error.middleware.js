import { errorResponse } from "../utils/responses.js";

export const assignHTTPError = (error, req, res, next) => {
    console.log(error);

    if (error.name === "ValidationError") {
        error.status = 422;
        error.name = "validationError";
    }

    if (!error.status) {
        error.status = 500;
    }

    if (!error.name) {
        error.name = "Internal Server Error";
    }

    error.message =
        error.message || "An Error occurred while executing information.";
    next(error);
};

export const errorResponder = (error, req, res, next) => {
    res.header("Content-Type", "application/json");
    const status = error.status || 500;
    res.status(status).send(errorResponse(error, status));
};


export const invalidPathHandler = (req, res) => {
    res.status(404);
    res.send(
        errorResponse("Invalid path, There is no route with the given path.", 404)
    );
};
