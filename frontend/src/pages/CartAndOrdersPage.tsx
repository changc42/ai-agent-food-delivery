import MenuPreview from './MenuPreview'
import CartPage from './CartPage'
import OrdersPage from './OrdersPage'
import type { MobileTab } from '../types'
import './CartAndOrdersPage.css'

interface CartAndOrdersPageProps {
  activeMobileTab: MobileTab
  onCartChange: () => void
  onOrdersChange: () => void
}

function CartAndOrdersPage({ activeMobileTab, onCartChange, onOrdersChange }: CartAndOrdersPageProps) {
  return (
    <div className="cart-and-orders-page">
      <div className="menu-preview-wrapper">
        <MenuPreview />
      </div>
      <div className="cart-and-orders">
        <div className={`cart-and-orders-column${activeMobileTab === 'cart' ? ' mobile-active' : ''}`}>
          <CartPage onCartChange={onCartChange} />
        </div>
        <div className={`cart-and-orders-column${activeMobileTab === 'orders' ? ' mobile-active' : ''}`}>
          <OrdersPage onOrdersChange={onOrdersChange} />
        </div>
      </div>
    </div>
  )
}

export default CartAndOrdersPage
