import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne} from 'typeorm'
import {Order} from '../../orders/entities/order.entity'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column({name: 'user_id'})
    firstname: string

    @Column({name: 'store_id'})
    lastname: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column({select: false})
    password: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @OneToMany(() => Order, order => order.user)
    orders: Order[]
}