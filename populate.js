import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userModel from './models/userModel.js';
import jobModel from './models/jobModel.js';
dotenv.config();


try {
  await mongoose.connect(process.env.MONGODB_URL);
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const user = await userModel.findOne({ email: 'aniltiwari573@gmail.com' });

  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await jobModel.deleteMany({ createdBy: user._id });
  await jobModel.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
