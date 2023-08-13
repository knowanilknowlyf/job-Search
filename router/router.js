import Router from 'express'
import { createNewJob, deleteJob, findOneJob, getAllJobs, showStats, updateJob } from '../controller/jobController.js'
import { validateJob,validatIdParam } from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'
const router = Router()

router.route('/').get(getAllJobs).post(checkForTestUser,validateJob,createNewJob)
router.route('/stats').get(showStats)
router.route('/:id').get(validatIdParam ,findOneJob)
.patch(checkForTestUser,validatIdParam,validateJob,updateJob).delete(checkForTestUser,validatIdParam,deleteJob)

export default router