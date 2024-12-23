import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CatchAsyncError } from './catchAsyncError'
import { redis } from '../utils/redis'
import ErrorHandler from '../utils/ErrorHandler'
import { updateAccessToken } from '../controller/user.controller'

export const isAutheticated = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const access_token = req.headers['access-token'] as string
        if (!access_token) {
            return next(
                new ErrorHandler('Please login to access this resource', 400)
            )
        }
        const decoded = jwt.decode(access_token) as JwtPayload
        if (!decoded) {
            return next(new ErrorHandler('access token is not valid', 400))
        }

        // check if the access token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            updateAccessToken(req, res, next)
        } else {
            const user = await redis.get(decoded.id)

            if (!user) {
                return next(
                    new ErrorHandler(
                        'Please login to access this resource',
                        400
                    )
                )
            }
            req.user = JSON.parse(user)
            next()
        }
    }
)

// validate user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, _: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role || '')) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user?.role} is not allowed to access this resource`,
                    403
                )
            )
        }
        next()
    }
}
