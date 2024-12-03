import { Response } from 'express'
import OrderModel from '../models/order.Model'
import { CatchAsyncError } from '../middleware/catchAsyncError'

// create new order
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const newOrder = CatchAsyncError(async (data: any, res: Response) => {
    const order = await OrderModel.create(data)

    res.status(201).json({
        succcess: true,
        order
    })
})

// Get All Orders
export const getAllOrdersService = async (res: Response) => {
    const orders = await OrderModel.find().sort({ createdAt: -1 })

    res.status(201).json({
        success: true,
        orders
    })
}
