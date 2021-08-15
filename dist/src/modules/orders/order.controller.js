"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const express_1 = __importDefault(require("express"));
const order_service_1 = require("./order.service");
class OrderController {
    constructor() {
        this.create = async (req, res) => {
            const order = await this.orderService.create(req.body);
            return res.status(201).send({ success: true, order });
        };
        this.findAll = async (req, res) => {
            const orders = await this.orderService.findAll();
            return res.status(200).send({ success: true, orders });
        };
        this.findById = async (req, res) => {
            const order = await this.orderService.findById(req.params._id);
            return res.status(200).send({ success: true, order });
        };
        this.update = async (req, res) => {
            const order = await this.orderService.update(req.params._id, req.body.status);
            return res.status(201).send({ success: true, order });
        };
        this.path = 'orders';
        this.orderService = new order_service_1.OrderService();
        this.router = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.router.get('', this.findAll);
        this.router.get('/:id', this.findById);
        this.router.post('/create', this.create);
        this.router.put('/update/:id', this.update);
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map