"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const order_controller_1 = require("./order.controller");
const server_1 = require("../../server");
const orm_config_1 = __importDefault(require("../../config/orm.config"));
const request = __importStar(require("supertest"));
beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await typeorm_1.createConnections(orm_config_1.default);
});
beforeEach(async () => {
});
afterAll(async () => {
    const connection = typeorm_1.getConnection('test');
    const entities = connection.entityMetadatas;
    entities.forEach(async (entity) => {
        const repository = connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
    });
    connection.close();
});
afterEach(async () => {
});
describe('The OrderController', () => {
    describe('POST /orders/create', () => {
        describe('if the order is created', () => {
            it('should return a status code of 200', async () => {
                const order = {
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
                const orderController = new order_controller_1.OrderController();
                const server = new server_1.Server([new order_controller_1.OrderController()], 5001);
                const response = await request.agent(server.app)
                    .post(`/api/v1/${orderController.path}/create`)
                    .send(order);
                expect(response.status).toBe(201);
            });
        });
    });
    describe('GET /orders', () => {
        it('should get all orders', () => {
            const orderController = new order_controller_1.OrderController();
            const server = new server_1.Server([new order_controller_1.OrderController()], 5001);
            const response = request.agent(server.app)
                .get(`/api/v1/${orderController.path}`)
                .expect(200);
        });
    });
    describe('GET /orders/:id', () => {
        it('should get an order with an id of the endpoint params id', () => {
            const orderController = new order_controller_1.OrderController();
            const server = new server_1.Server([new order_controller_1.OrderController()], 5001);
            const response = request.agent(server.app)
                .get(`/api/v1/${orderController.path}`)
                .expect(200);
        });
    });
    describe('PUT /orders/update', () => {
        it('should update an order with an id of the endpoint params id', () => {
            const orderController = new order_controller_1.OrderController();
            const server = new server_1.Server([new order_controller_1.OrderController()], 5001);
            const response = request.agent(server.app)
                .put(`/api/v1/${orderController.path}`)
                .expect(201);
        });
    });
});
//# sourceMappingURL=order.test.js.map