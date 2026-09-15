import MenuPreview from './MenuPreview'
import CartPage from './CartPage'
import OrdersPage from './OrdersPage'
import './CartAndOrdersPage.css'

function CartAndOrdersPage() {
  return (
    <div className="cart-and-orders-page">
      <MenuPreview />
      <div className="cart-and-orders">
        <div className="cart-and-orders-column">
          <CartPage />
        </div>
        <div className="cart-and-orders-column">
          <OrdersPage />
        </div>
      </div>
    </div>
  )
}

export default CartAndOrdersPage
