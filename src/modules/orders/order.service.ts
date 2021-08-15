import {getConnection} from 'typeorm'
import {Order} from './entities/order.entity'
import {OrderRepository} from './repositories/order.repository'
import {IOrder} from './interfaces/order.interface'
import {orderConstants} from '../../common/constants/order.constants'
import moment from 'moment'

export class OrderService {
    private orderRepository: OrderRepository
    private connectionName: string = process.env.NODE_ENV === 'test' ? 'test' : 'dev'
    constructor() {
        this.orderRepository = getConnection(this.connectionName).getCustomRepository(OrderRepository)
    }

    async create(payload: IOrder): Promise<Order[]> {
        
        // Convert the scheduled day of the week to date.
        let scheduledDay = moment().day(payload.scheduledDay)

        // If scheduled day of the week is past, get corresponding day of next week.
        let fufillmentDate = scheduledDay.isBefore(moment()) ? moment().day(payload.scheduledDay + 7) : scheduledDay

        // Check if computed scheduled day of the week is less than the cutoff time.
        // If computed scheduled day is less than the cutoff time,
        // We move the fulfillment date to the corresponding day of next week
        if(fufillmentDate.diff(moment(), 'hours') < orderConstants.CUTOFF_TIME) {
            fufillmentDate = moment(fufillmentDate).day(payload.scheduledDay + 7)
        }

        // Get moment string for incrementing fulfillment dates by either months or weeks
        const timeUnit = payload.frequency == 4 ? 'months' : 'weeks'
        let ordersCreated: Order[] = []
        try {
            for(let index = 0; index < Number(payload.subscriptionDuration); index++) {
                const order = new Order()
                order.storeId = payload.storeId
                order.userId = payload.userId
                order.totalAmount = payload.totalAmount
                order.products = payload.products
                order.frequency = payload.frequency
                order.subscriptionDuration = payload.subscriptionDuration
                order.scheduledDay = payload.scheduledDay

                // If the frequency is 2(Bi-weekly), we increment the fulfillment date with two weeks interval
                order.fulfilmentDate = moment(fufillmentDate)
                    .add(payload.frequency === 2 ? (index * 2) : index, timeUnit)
                    .day(payload.scheduledDay)
                    .format('YYYY-MM-DD')

                let orderCreated = this.orderRepository.save(order)
                ordersCreated.push(await orderCreated)
            }
            return ordersCreated
        }catch(error) {
            throw new Error(error)
        }
    }

    async findAll(): Promise<Order[] | null> {
        return this.orderRepository.find({
            select: ['_id', 'userId', 'storeId', 'products', 'fulfilmentDate', 'status'], 
            order: {fulfilmentDate: 'DESC'}
        })
    }

    async findById(_id: string): Promise<Order | null> {
        return this.orderRepository.findOne(_id, {
            select: ['_id', 'userId', 'storeId', 'products', 'fulfilmentDate', 'status']
        })
    }

    async update(_id: string, status: 'pending' | 'fulfilled') {
        const order = await this.orderRepository.findOne(_id)
        this.orderRepository.merge(order, {status})
        return this.orderRepository.save(order)
    }
}