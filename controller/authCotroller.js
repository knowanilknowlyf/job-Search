import userModel from "../models/userModel.js"
import StatusCodes from 'http-status-codes'
import bcrypt from "bcryptjs"
import { comparePassword, hashPassword } from "../utils/passwordUtils.js"
import { UnAuthenticated } from "../errors/customErrors.js"
import { createJwtToken } from "../utils/tokenUtils.js"
export const register = async (req, res) => {
    const isFirst = await userModel.count() === 0
    req.body.role = isFirst ? 'admin' : 'user'
    req.body.password = await hashPassword(req.body.password)

    const user = await userModel.create(req.body)
    return res.status(StatusCodes.CREATED).json({ msg: 'User Created' })
}
export const login = async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })
    const isValidUser = user && await comparePassword(req.body.password, user.password)
    const oneDay = 1000 * 60 * 60 * 24
    if (!isValidUser) throw new UnAuthenticated('Invalid Credentials')

    const token = createJwtToken({ userId: user._id, role: user.role })
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV == 'production'
    })
    res.status(StatusCodes.OK).json({ msg: "User logged in" })
}
export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({
        msg: 'usr logged out'
    })
}