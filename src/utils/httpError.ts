import { NextFunction, Request } from 'express'
import errorObject from './errorObject'

export default (
    nextFunc: NextFunction,
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    err: Error | unknown,
    req: Request,
    errorStatusCode: number = 500
): void => {
    const errorObj = errorObject(err, req, errorStatusCode)
    return nextFunc(errorObj)
}

