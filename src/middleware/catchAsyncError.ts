import { NextFunction, Request, Response } from 'express'

export const CatchAsyncError =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(theFunc(req, res, next)).catch(next)
    }
