import jwt from "jsonwebtoken"


export const createJwtToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN })
    return token
}

export const decodedJwtToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}