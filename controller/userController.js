import userModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import jobModel from '../models/jobModel.js';
import { promises as fs} from 'fs'
import cloudinary from 'cloudinary';

export const getAllUsers = async (req, res) => {
    const user = await userModel.find({})
    return res.status(StatusCodes.OK).json({ user })
}


export const createNewUser = async (req, res) => {
    const user = await userModel.create(req.body)
    return res.status(StatusCodes.CREATED).json({ user })
}


export const findOneUser = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id)
    res.status(StatusCodes.OK).json({ user });
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const removedUser = await userModel.findByIdAndDelete(id)
    return res.status(StatusCodes.OK).json({ message: 'user Deleted', removedUser })
}
// Actual controller
export const getCurrentUser = async (req, res) => {
    const { userId } = req.user;
    console.log(req.user)
    const user = await userModel.findById(userId)
    const userWithoutPassword = user.toJSON()
    return res.status(StatusCodes.OK).json({'user':userWithoutPassword})
}
export const getAppStat = async (req, res) => {

    const user = await userModel.countDocuments()
    const job = await jobModel.countDocuments()
    return res.status(StatusCodes.OK).json({ user, job })
}
export const updateUser = async (req, res) => {
    console.log(req.file)

    const id  = req.user.userId;
    const obj = { ...req.body }
    delete obj.password
    if(req.file){
        const response = await cloudinary.v2.uploader.upload(req.file.path)
        await fs.unlink(req.file.path)
        obj.avatar=response.secure_url;
        obj.avatarPublicId=response.public_id;
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, obj, { new: true })
    if(req.file&&updatedUser.avatarPublicId){
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    return res.status(StatusCodes.OK).json({ message: 'updated user' })
} 