"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const order_controller_1 = require("./modules/orders/order.controller");
const typeorm_1 = require("typeorm");
const orm_config_1 = __importDefault(require("./config/orm.config"));
const port = Number(process.env.NODE_ENV === 'test' ? '5001' : '5000');
const App = (async () => {
    try {
        await typeorm_1.createConnections(orm_config_1.default);
    }
    catch (error) {
        console.log('Error while connecting to the database', error);
        return error;
    }
    const App = new server_1.Server([
        new order_controller_1.OrderController(),
    ], port).start();
})();
exports.default = App;
//# sourceMappingURL=app.js.map