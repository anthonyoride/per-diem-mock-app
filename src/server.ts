import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import {OrderController} from './modules/orders/order.controller'

export class Server {
    public app: express.Application
    public port: number
    public orderController: OrderController

    constructor(controllers: any[], port: number) {
        this.app = express()
        this.port = port
        this.initBaseConfig()
        this.initRouterConfig(controllers)
    }

    public initBaseConfig() {
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json({limit: '1mb'}))
        this.app.use(cors())
    }

    public async initRouterConfig(controllers: any): Promise<void> {
        controllers.forEach((controller: any) => {
            this.app.use(`/api/v1/${controller.path}`, controller.router)
        })
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }
}