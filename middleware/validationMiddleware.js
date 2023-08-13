import { body, param, validationResult } from "express-validator"
import { BadRequest, NotFoundError, UnAutherized } from "../errors/customErrors.js"
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js"
import mongoose, { Error } from "mongoose"
import jobModel from "../models/jobModel.js"
import userModel from "../models/userModel.js"

const withValidationErrors = (validateValues) => {
    return [
        validateValues, (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((err) => err.msg)
                if(errorMessages[0].startsWith('no job')){
                    throw new NotFoundError(errorMessages[0])
                }
                if(errorMessages[0].startsWith('Not authorized')){
                    throw new UnAutherized(errorMessages[0])
                }

                throw new BadRequest(errorMessages)
            }
            next()
        }
    ]
}

export const validateJob = withValidationErrors([
    body('company')
        .notEmpty()
        .withMessage('company is required'),
    body('position')
        .notEmpty()
        .withMessage('position is required'),
    body('jobLocation')
        .notEmpty()
        .withMessage('job location is required'),
    body('jobStatus')
        .isIn(Object.values(JOB_STATUS))
        .withMessage('Invalid Job Status'),
    body('jobType')
        .isIn(Object.values(JOB_TYPE))
        .withMessage('Invalid Job Type')
])

export const validateUser = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (email) => {
            const user = await userModel.findOne({ email })
            if (user) throw new BadRequest('email already exist')
        }),
    body('password')
        .notEmpty()
        .withMessage('Password is required').isLength({ min: 8 })
        .withMessage('Minimum password length is 8'),
    body('location')
        .notEmpty()
        .withMessage('user location is required'),
    body('lastName')
        .notEmpty()
        .withMessage('user lastName is required'),

   
])
export const validateUpdateUser = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (email,{req}) => {
            const user = await userModel.findOne({ email })
            if (user&& user._id.toString()!=req.user.userId) throw new BadRequest('email already exist')
        }),
    
    body('location')
        .notEmpty()
        .withMessage('user location is required'),
    body('lastName')
        .notEmpty()
        .withMessage('user lastName is required')


])
export const validateLogin = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Invalid email format')
    ,
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
])

export const validatIdParam = withValidationErrors([

    param('id').custom(
        async (value, {req}) => {
            const isValid = mongoose.Types.ObjectId.isValid(value)
            if (!isValid) throw new BadRequest('Invalid Id')
            const job = await jobModel.findById(value)
            if (!job) throw new NotFoundError(`no job with id ${value}`);

            const isAdmin = req.user.role === 'admin'
            const isOwner = req.user.userId === job.createdBy.toString()
            if (!isAdmin && !isOwner) throw new UnAutherized('Not authorized to this access')

        }
        // .withMessage('Invalid Id')
    )])