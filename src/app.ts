import {Server} from './server'
import {OrderController} from './modules/orders/order.controller'
import {createConnections} from 'typeorm'
import config from './config/orm.config'

const port = Number(process.env.NODE_ENV === 'test' ? '5001' : '5000')

const App = (async () => {
    try {
        await createConnections(config)
    } catch (error) {
        console.log('Error while connecting to the database', error)
        return error;
    }
    const App = new Server([
        new OrderController(),
    ], port).start()
})()

export default App