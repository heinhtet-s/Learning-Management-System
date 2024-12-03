import express from 'express'
import {
    addAnwser,
    addQuestion,
    addReplyToReview,
    addReview,
    deleteCourse,
    editCourse,
    generateVideoUrl,
    getAdminAllCourses,
    getAllCourses,
    getCourseByUser,
    getSingleCourse,
    uploadCourse
} from '../controller/course.controller'
import { authorizeRoles } from '../middleware/auth'

const courseRouter = express.Router()

// Apply `isAutheticated` globally to all routes in `courseRouter`
// courseRouter.use(isAutheticated)

courseRouter.post('/create-course', authorizeRoles('admin'), uploadCourse)

courseRouter.put('/edit-course/:id', authorizeRoles('admin'), editCourse)

courseRouter.get('/get-course/:id', getSingleCourse)

courseRouter.get('/get-courses', getAllCourses)

courseRouter.get(
    '/get-admin-courses',
    authorizeRoles('admin'),
    getAdminAllCourses
)

courseRouter.get('/get-course-content/:id', getCourseByUser)

courseRouter.put('/add-question', addQuestion)

courseRouter.put('/add-answer', addAnwser)

courseRouter.put('/add-review/:id', addReview)

courseRouter.put('/add-reply', authorizeRoles('admin'), addReplyToReview)

courseRouter.post('/getVdoCipherOTP', generateVideoUrl)

courseRouter.delete('/delete-course/:id', authorizeRoles('admin'), deleteCourse)

export default courseRouter
