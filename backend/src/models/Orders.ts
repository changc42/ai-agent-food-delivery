import {MenuItem} from "./MenuItem.js"
import {cart, clearCart, type CartEntry} from "./Cart.js"

let orders: Order[] = []

class Order{
    constructor(
        public orderLineItems: OrderLineItem[],
        public timestamp: Date
    ){}
}

class OrderLineItem{
    constructor(
        public menuItem: MenuItem,
        public quantity: number
    ){}
}

function createOrder(){
    let cartEntries: CartEntry[] = Object.values(cart) as CartEntry[]
    orders.push(
        new Order(
            cartEntries.map(
                ({menuItem, quantity}) => new OrderLineItem(menuItem, quantity)
            ),
            new Date()
        )
    )
    clearCart()
}

// function createOrder(menuItemsAndQuantities: [MenuItem, number][]){
//     orders.push(
//         new Order(
//             menuItemsAndQuantities.map(
//                 ([menuItem, quantity]) => new OrderLineItem(menuItem, quantity)
//             ),
//             new Date()
//         )
//     )
// }

function clearOrdersHistory(){
    orders = []
}

export {orders, createOrder, clearOrdersHistory}