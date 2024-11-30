export type THttpResponse = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
}

declare module 'express-serve-static-core' {
    interface Request {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user?: any
    }
}
export type THttpError = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null
}
