import type { MobileTab } from './types'
import './MobileTabBar.css'

interface MobileTabBarProps {
  activeTab: MobileTab
  onSelectTab: (tab: MobileTab) => void
  cartUpdateCount: number
  ordersUpdateCount: number
}

const TABS: { id: MobileTab; label: string; icon: string }[] = [
  { id: 'chat', label: 'Chat', icon: '💬' },
  { id: 'cart', label: 'Cart', icon: '🛒' },
  { id: 'orders', label: 'Orders', icon: '📋' },
]

function MobileTabBar({ activeTab, onSelectTab, cartUpdateCount, ordersUpdateCount }: MobileTabBarProps) {
  const updateCount: Record<MobileTab, number> = {
    chat: 0,
    cart: cartUpdateCount,
    orders: ordersUpdateCount,
  }

  return (
    <nav className="mobile-tab-bar" aria-label="Mobile navigation">
      {TABS.map(({ id, label, icon }) => {
        const hasUpdate = updateCount[id] > 0
        return (
          <button
            key={id}
            type="button"
            className={`mobile-tab-bar-item${id === activeTab ? ' active' : ''}`}
            onClick={() => onSelectTab(id)}
          >
            <span className="mobile-tab-bar-icon">
              <span key={updateCount[id]} className={`mobile-tab-bar-icon-glyph${hasUpdate ? ' bounce' : ''}`}>
                {icon}
              </span>
              {hasUpdate && <span className="mobile-tab-bar-badge" aria-label={`${label} updated`} />}
            </span>
            <span className="mobile-tab-bar-label">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default MobileTabBar
