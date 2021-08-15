"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let Order = class Order {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Order.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ name: 'store_id', type: 'uuid' }),
    __metadata("design:type", String)
], Order.prototype, "storeId", void 0);
__decorate([
    typeorm_1.Column({ name: 'total_amount' }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    typeorm_1.Column({ type: 'jsonb' }),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: [1, 2, 4]
    }),
    __metadata("design:type", Number)
], Order.prototype, "frequency", void 0);
__decorate([
    typeorm_1.Column({
        name: 'scheduled_day',
        type: 'enum',
        enum: [1, 2, 3, 4, 5, 6, 7]
    }),
    __metadata("design:type", Number)
], Order.prototype, "scheduledDay", void 0);
__decorate([
    typeorm_1.Column({ name: 'subscription_duration' }),
    __metadata("design:type", Number)
], Order.prototype, "subscriptionDuration", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: ['pending', 'fulfilled'],
        default: 'pending'
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ name: 'fulfillment_date' }),
    __metadata("design:type", String)
], Order.prototype, "fulfilmentDate", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, user => user.orders, { onDelete: 'CASCADE', createForeignKeyConstraints: false }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
Order = __decorate([
    typeorm_1.Entity('orders')
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map