import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'
import { MENU_ITEM_EMOJI } from '../menuItemEmoji'
import './MenuPreview.css'

interface MenuItemData {
  name: string
  price: number
}

type Menu = Record<string, MenuItemData>

function MenuPreview() {
  const [menu, setMenu] = useState<Menu | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => setMenu(data.menu))
      .catch(() => setError('Could not load the menu.'))
  }, [])

  if (error) {
    return <p className="menu-preview-message">{error}</p>
  }

  if (!menu) {
    return <p className="menu-preview-message">Loading menu...</p>
  }

  return (
    <div className="menu-preview">
      {Object.entries(menu).map(([key, item]) => (
        <div className="menu-preview-item" key={key}>
          <span className="menu-preview-emoji" role="img" aria-label={item.name}>
            {MENU_ITEM_EMOJI[key] ?? '🍽️'}
          </span>
          <span className="menu-preview-name">{item.name}</span>
          <span className="menu-preview-price">${item.price.toFixed(2)}</span>
        </div>
      ))}
    </div>
  )
}

export default MenuPreview
