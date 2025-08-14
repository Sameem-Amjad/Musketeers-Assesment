import jwt from "jsonwebtoken"
const userPayload = (user) => {
    let payload = {
        user: user?._id || "",
        interests: user?.interests || []
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    return token;
}

export default userPayload;