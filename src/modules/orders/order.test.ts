import * as typeorm from 'typeorm'
import {OrderService} from '../orders/order.service'
import {getConnection, createConnections} from 'typeorm'
import {OrderController} from './order.controller'
import {IOrder} from '../orders/interfaces/order.interface'
import {Server} from '../../server'
import config from '../../config/orm.config'
import * as request from 'supertest'

beforeAll(async() => {
    process.env.NODE_ENV = 'test'
    await createConnections(config)
})

beforeEach(async() => {

})

afterAll(async () => {
    const connection = getConnection('test')
    const entities = connection.entityMetadatas
    entities.forEach(async (entity) => {
        const repository = connection.getRepository(entity.name)
        await repository.query(`DELETE FROM ${entity.tableName}`)
    })
    connection.close()
})

afterEach(async () => {
    
})

describe('The OrderController', () => {
    describe('POST /orders/create', () => {
        describe('if the order is created', () => {
            it('should return a status code of 200', async () => {
                const order: IOrder = {
                    userId: "879c8972-e4a8-4075-b5a1-ab47d6215188",
                    storeId: "197b21d5-e2d3-4c41-acad-074459423736",
                    totalAmount: 10000,
                    products: [
                        {
                            "name": "cheese",
                            "amount": 4000,
                            "quantity": 2
                        },
                        {
                            "name": "burger",
                            "amount": 2000,
                            "quantity": 1
                        }
                    ],
                    subscriptionDuration: 6,
                    frequency: 1,
                    scheduledDay: 3
                };

                const orderController = new OrderController() 
                const server = new Server([new OrderController()], 5001)
                
                const response = await request.agent(server.app)
                    .post(`/api/v1/${orderController.path}/create`)
                    .send(order);
                    expect(response.status).toBe(201)
            })
        })
    })

    describe('GET /orders', () => {
        it('should get all orders', () => {
            const orderController = new OrderController() 
            const server = new Server([new OrderController()], 5001)

            const response = request.agent(server.app)
                .get(`/api/v1/${orderController.path}`)
                .expect(200)
        })
    })

    describe('GET /orders/:id', () => {
        it('should get an order with an id of the endpoint params id', () => {
            const orderController = new OrderController() 
            const server = new Server([new OrderController()], 5001)

            const response = request.agent(server.app)
                .get(`/api/v1/${orderController.path}`)
                .expect(200)
        })
    })

    describe('PUT /orders/update', () => {
        it('should update an order with an id of the endpoint params id', () => {
            const orderController = new OrderController() 
            const server = new Server([new OrderController()], 5001)

            const response = request.agent(server.app)
                .put(`/api/v1/${orderController.path}`)
                .expect(201)
        })
    })
})






