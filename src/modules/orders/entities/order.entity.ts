import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from 'typeorm'
import {User} from '../../users/entities/user.entity'

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column({name: 'user_id', type: 'uuid'})
    userId: string

    @Column({name: 'store_id', type: 'uuid'})
    storeId: string

    @Column({name: 'total_amount'})
    totalAmount: number

    @Column({type: 'jsonb'})
    products: Array<{name: string, amount: number, quantity: number}>

    @Column({
        type: 'enum',
        enum: [1, 2, 4]
    })
    frequency: 1 | 2 | 4

    @Column({
        name: 'scheduled_day',
        type: 'enum',
        enum: [1, 2, 3, 4, 5, 6, 7]
    })
    scheduledDay: 1 | 2 | 3 | 4 | 5 | 6 | 7

    @Column({name: 'subscription_duration'})
    subscriptionDuration: number

    @Column({
        type: 'enum',
        enum: ['pending', 'fulfilled'],
        default: 'pending'
    })
    status: 'pending' | 'fulfilled'

    @Column({name: 'fulfillment_date'})
    fulfilmentDate: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @ManyToOne(() => User, user => user.orders, {onDelete: 'CASCADE', createForeignKeyConstraints: false})
    @JoinColumn({name: 'user_id'})
    user: User
}