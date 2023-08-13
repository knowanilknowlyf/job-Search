import mongoose from 'mongoose';
import jobModel from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';
import day from "dayjs";
export const getAllJobs = async (req, res) => {
    const job = await jobModel.find({ createdBy: req.user.userId })

    return res.status(StatusCodes.OK).json({ job })
}


export const createNewJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await jobModel.create(req.body)
    return res.status(StatusCodes.CREATED).json({ job })
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await jobModel.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(StatusCodes.OK).json({ message: 'updated job', job: updatedJob })
}

export const findOneJob = async (req, res) => {
    const { id } = req.params;
    const job = await jobModel.findById(id)
    res.status(StatusCodes.OK).json({ job });
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removedJob = await jobModel.findByIdAndDelete(id)
    return res.status(StatusCodes.OK).json({ message: 'job Deleted', removedJob })
}
export const showStats = async (req, res) => {
    let stats = await jobModel.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: { _id: '$jobStatus', count: { $sum: 1 } }
        }
    ])
    stats = stats.reduce((acc, cur) => {
        const { _id: title, count } = cur
        acc[title] = count
        return acc
    }, {})

    console.log(stats)
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }
   
    let monthlyApplications = await jobModel.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }
                , count: { $sum: 1 }
            }
        },
        { $sort: { '_id.year': -1, 'id.month': -1 } }
    ])
    monthlyApplications = monthlyApplications.map(val => {
 
        const { _id: { year, month }, count } = val
        const date = day().month(month - 1).year(year).format("MMM YY")
        return { date, count }
    }).reverse()
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}