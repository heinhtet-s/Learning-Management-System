import { Request, Response, NextFunction } from 'express'
import ErrorHandler from '../utils/ErrorHandler'

interface CustomError extends Error {
    statusCode?: number
    code?: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keyValue?: Record<string, any>
    path?: string
}

const globalErrorHandler = (
    err: CustomError,
    _: Request,
    res: Response,
    next: NextFunction // Required to mark this as error-handling middleware
) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal server error'

    // Wrong MongoDB ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue || {}).join(', ')} entered`
        err = new ErrorHandler(message, 400)
    }

    // Wrong JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Json web token is invalid, try again'
        err = new ErrorHandler(message, 400)
    }

    // JWT Expired Error
    if (err.name === 'TokenExpiredError') {
        const message = 'Json web token is expired, try again'
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    })

    // Call next() only if there's further middleware to execute
    next()
}

export default globalErrorHandler
