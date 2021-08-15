import express from 'express'
import {OrderService} from './order.service'

export class OrderController {
    private orderService: OrderService
    public router: express.Router
    public path: string

    constructor() {
        this.path = 'orders'
        this.orderService = new OrderService()
        this.router = express.Router()
        this.routes()
    }

    public create = async(req: express.Request, res: express.Response) => {
        const order = await this.orderService.create(req.body)
        return res.status(201).send({success: true, order})
    }

    public findAll = async(req: express.Request, res: express.Response) => {
        const orders = await this.orderService.findAll()
        return res.status(200).send({success: true, orders})
    }

    public findById = async(req: express.Request, res: express.Response) => {
        const order = await this.orderService.findById(req.params._id)
        return res.status(200).send({success: true, order})
    }

    public update = async(req: express.Request, res: express.Response) => {
        const order = await this.orderService.update(req.params._id, req.body.status)
        return res.status(201).send({success: true, order})
    }

    public routes() {
        this.router.get('', this.findAll)
        this.router.get('/:id', this.findById)
        this.router.post('/create', this.create)
        this.router.put('/update/:id', this.update)
    }
}