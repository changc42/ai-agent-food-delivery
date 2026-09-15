import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'
import { MENU_ITEM_EMOJI } from '../menuItemEmoji'
import './CartPage.css'

interface MenuItemData {
  name: string
  price: number
}

type CartEntry = { menuItem: MenuItemData, quantity: number }
type Cart = Record<string, CartEntry>

function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [removalKey, setRemovalKey] = useState<string | null>(null)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  useEffect(() => {
    const fetchCart = () =>
      fetch(`${BACKEND_URL}/api/cart`)
        .then((res) => res.json())
        .then((data) => setCart(data.cart))
        .catch(() => setError('Could not load the cart.'))

    fetchCart()
    const intervalId = setInterval(fetchCart, 2000)
    return () => clearInterval(intervalId)
  }, [])

  const handleIncrement = (menuItemFieldName: string) => {
    fetch(`${BACKEND_URL}/api/cart/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ menuItemFieldName }),
    })
      .then((res) => res.json())
      .then((data) => setCart(data.cart))
      .catch(() => {})
  }

  const handleDecrement = (menuItemFieldName: string) => {
    fetch(`${BACKEND_URL}/api/cart/items/${menuItemFieldName}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => setCart(data.cart))
      .catch(() => {})
  }

  const handleConfirmRemove = () => {
    if (!removalKey) return
    fetch(`${BACKEND_URL}/api/cart/items/${removalKey}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => setCart(data.cart))
      .catch(() => {})
      .finally(() => setRemovalKey(null))
  }

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true)
    fetch(`${BACKEND_URL}/api/orders`, { method: 'POST' })
      .then(() => setCart({}))
      .catch(() => {})
      .finally(() => setIsPlacingOrder(false))
  }

  const handleClearCart = () => {
    fetch(`${BACKEND_URL}/api/cart/clear`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setCart(data.cart))
      .catch(() => {})
  }

  if (error) {
    return (
      <div className="page-placeholder">
        <p>{error}</p>
      </div>
    )
  }

  if (!cart) {
    return (
      <div className="page-placeholder">
        <p>Loading cart...</p>
      </div>
    )
  }

  const entries = Object.entries(cart)

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h2>Cart</h2>
        {entries.length > 0 && (
          <button type="button" className="clear-button" onClick={handleClearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {entries.length === 0 && <p className="cart-empty-message">Your cart is empty.</p>}

      {entries.length > 0 && (
        <div className="cart-list">
          {entries.map(([key, { menuItem: item, quantity }]) => (
            <div className="cart-item" key={key}>
              <div className="cart-item-image">
                <span role="img" aria-label={item.name}>
                  {MENU_ITEM_EMOJI[key] ?? '🍽️'}
                </span>
              </div>
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                {quantity > 1 ? (
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => handleDecrement(key)}
                  >
                    −
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => setRemovalKey(key)}
                  >
                    🗑️
                  </button>
                )}
                <span className="cart-item-quantity-value">{quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() => handleIncrement(key)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="cart-place-order"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
          >
            Place Order
          </button>

          {removalKey && cart[removalKey] && (
            <div className="cart-modal-overlay" onClick={() => setRemovalKey(null)}>
              <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <p>Do you want to remove this item from your cart?</p>
                <div className="cart-modal-actions">
                  <button type="button" className="cart-modal-yes" onClick={handleConfirmRemove}>
                    Yes
                  </button>
                  <button type="button" className="cart-modal-no" onClick={() => setRemovalKey(null)}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CartPage
