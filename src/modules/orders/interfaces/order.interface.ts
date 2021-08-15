export interface IOrder {
    userId: string,
    storeId: string,
    totalAmount: number,
    products: Array<{name: string, amount: number, quantity: number}>,
    subscriptionDuration: number,
    frequency: 1 | 2 | 4,
    scheduledDay: 1 | 2 | 3 | 4 | 5 | 6 | 7
}