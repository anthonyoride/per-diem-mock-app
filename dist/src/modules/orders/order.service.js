"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_repository_1 = require("./repositories/order.repository");
const order_constants_1 = require("../../common/constants/order.constants");
const moment_1 = __importDefault(require("moment"));
class OrderService {
    constructor() {
        this.connectionName = process.env.NODE_ENV === 'test' ? 'test' : 'dev';
        this.orderRepository = typeorm_1.getConnection(this.connectionName).getCustomRepository(order_repository_1.OrderRepository);
    }
    async create(payload) {
        // Convert the scheduled day of the week to date.
        let scheduledDay = moment_1.default().day(payload.scheduledDay);
        // If scheduled day of the week is past, get corresponding day of next week.
        let fufillmentDate = scheduledDay.isBefore(moment_1.default()) ? moment_1.default().day(payload.scheduledDay + 7) : scheduledDay;
        // Check if computed scheduled day of the week is less than the cutoff time.
        // If computed scheduled day is less than the cutoff time,
        // We move the fulfillment date to the corresponding day of next week
        if (fufillmentDate.diff(moment_1.default(), 'hours') < order_constants_1.orderConstants.CUTOFF_TIME) {
            fufillmentDate = moment_1.default(fufillmentDate).day(payload.scheduledDay + 7);
        }
        // Get moment string for incrementing fulfillment dates by either months or weeks
        const timeUnit = payload.frequency == 4 ? 'months' : 'weeks';
        let ordersCreated = [];
        try {
            for (let index = 0; index < Number(payload.subscriptionDuration); index++) {
                const order = new order_entity_1.Order();
                order.storeId = payload.storeId;
                order.userId = payload.userId;
                order.totalAmount = payload.totalAmount;
                order.products = payload.products;
                order.frequency = payload.frequency;
                order.subscriptionDuration = payload.subscriptionDuration;
                order.scheduledDay = payload.scheduledDay;
                // If the frequency is 2(Bi-weekly), we increment the fulfillment date with two weeks interval
                order.fulfilmentDate = moment_1.default(fufillmentDate)
                    .add(payload.frequency === 2 ? (index * 2) : index, timeUnit)
                    .day(payload.scheduledDay)
                    .format('YYYY-MM-DD');
                let orderCreated = this.orderRepository.save(order);
                ordersCreated.push(await orderCreated);
            }
            return ordersCreated;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findAll() {
        return this.orderRepository.find({
            select: ['_id', 'userId', 'storeId', 'products', 'fulfilmentDate', 'status'],
            order: { fulfilmentDate: 'DESC' }
        });
    }
    async findById(_id) {
        return this.orderRepository.findOne(_id, {
            select: ['_id', 'userId', 'storeId', 'products', 'fulfilmentDate', 'status']
        });
    }
    async update(_id, status) {
        const order = await this.orderRepository.findOne(_id);
        this.orderRepository.merge(order, { status });
        return this.orderRepository.save(order);
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map