import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'
import './OrdersPage.css'

interface MenuItemData {
  name: string
  price: number
}

interface OrderLineItemData {
  menuItem: MenuItemData
  quantity: number
}

interface OrderData {
  orderLineItems: OrderLineItemData[]
  timestamp: string
}

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function calculateTotal(orderLineItems: OrderLineItemData[]) {
  return orderLineItems.reduce((total, { menuItem, quantity }) => total + menuItem.price * quantity, 0)
}

function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = () =>
      fetch(`${BACKEND_URL}/api/orders`)
        .then((res) => res.json())
        .then((data) => setOrders(data.orders))
        .catch(() => setError('Could not load your orders.'))

    fetchOrders()
    const intervalId = setInterval(fetchOrders, 2000)
    return () => clearInterval(intervalId)
  }, [])

  const handleClearOrders = () => {
    fetch(`${BACKEND_URL}/api/orders/reset`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders))
      .catch(() => {})
  }

  if (error) {
    return (
      <div className="page-placeholder">
        <p>{error}</p>
      </div>
    )
  }

  if (!orders) {
    return (
      <div className="page-placeholder">
        <p>Loading orders...</p>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="orders-page-header">
        <h2>Orders</h2>
        {orders.length > 0 && (
          <button type="button" className="clear-button" onClick={handleClearOrders}>
            Clear Orders
          </button>
        )}
      </div>

      {orders.length === 0 && <p className="orders-empty-message">You have no past orders.</p>}

      {orders.length > 0 && (
        <div className="orders-list">
          {[...orders].reverse().map((order, index) => (
            <div className="order-card" key={`${order.timestamp}-${index}`}>
              <div className="order-header">
                <span className="order-date">{formatDate(order.timestamp)}</span>
                <span className="order-time">{formatTime(order.timestamp)}</span>
              </div>
              <ul className="order-items">
                {order.orderLineItems.map(({ menuItem, quantity }) => (
                  <li className="order-item" key={menuItem.name}>
                    <span className="order-item-name">{menuItem.name}</span>
                    <span className="order-item-quantity">x{quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="order-total">
                <span>Total</span>
                <span>${calculateTotal(order.orderLineItems).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage
