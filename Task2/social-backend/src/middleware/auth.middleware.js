import createError from "http-errors";
import jwt from "jsonwebtoken";

export function authGuard() {
    return (req, res, next) => {
        try {
            const token = req.header("Authorization");
            if (!token) throw new Error("Authorization Token doesn't Exist");

            const jwtToken = token.split(" ")[1];
            const payload = jwt.verify(
                jwtToken,
                process.env.JWT_SECRET_KEY
            );

            req.user = payload.user;

            next();
        } catch (err) {

            let error = new createError.Unauthorized(err.message);
            next(error);
        }
    };
}
