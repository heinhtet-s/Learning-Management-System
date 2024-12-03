import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import helmet from 'helmet'
import cors from 'cors'
import httpError from './utils/httpError'
import userRouter from './route/user.route'
import courseRouter from './route/course.route'
import logger from './utils/logger'

const app: Application = express()

// Middleware
app.use(helmet())
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: '*',
        credentials: true
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))
app.get('/test', (_, res: Response) => {
    res.status(200).json({
        succcess: true,
        message: 'API is working'
    })
})
// Routes
app.use('/api/v1', userRouter, courseRouter)

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        logger.warn('dd')
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

// Global Error Handler
app.use(globalErrorHandler)

export default app
