import { useCallback, useEffect, useRef, useState } from 'react'
import NavBar from './NavBar'
import HomePage from './pages/HomePage'
import CartAndOrdersPage from './pages/CartAndOrdersPage'
import MenuPreview from './pages/MenuPreview'
import MobileTabBar from './MobileTabBar'
import ChatBox from './ChatBox'
import type { Page, MobileTab } from './types'
import './App.css'

function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [page, setPage] = useState<Page>('chat')
  const [mobileTab, setMobileTab] = useState<MobileTab>('chat')
  const [cartUpdateCount, setCartUpdateCount] = useState(0)
  const [ordersUpdateCount, setOrdersUpdateCount] = useState(0)

  const mobileTabRef = useRef(mobileTab)
  useEffect(() => {
    mobileTabRef.current = mobileTab
  }, [mobileTab])

  const handleCartChange = useCallback(() => {
    if (mobileTabRef.current !== 'cart') setCartUpdateCount((count) => count + 1)
  }, [])

  const handleOrdersChange = useCallback(() => {
    if (mobileTabRef.current !== 'orders') setOrdersUpdateCount((count) => count + 1)
  }, [])

  const handleSelectMobileTab = (tab: MobileTab) => {
    setMobileTab(tab)
    if (tab === 'cart') setCartUpdateCount(0)
    if (tab === 'orders') setOrdersUpdateCount(0)
  }

  if (!hasEntered) {
    return <HomePage onEnter={() => setHasEntered(true)} />
  }

  return (
    <>
      {page === 'chat' && <NavBar currentPage={page} onSelectPage={setPage} />}
      <div className={`app-shell${page === 'chat' ? ' bordered' : ''}`}>
        {page === 'chat' ? (
          <>
            <aside className={`chat-sidebar${mobileTab === 'chat' ? ' mobile-active' : ''}`}>
              <div className="chat-menu-preview">
                <MenuPreview />
              </div>
              <ChatBox />
            </aside>
            <div className={`app-main${mobileTab !== 'chat' ? ' mobile-active' : ''}`}>
              <main className="page-content">
                <CartAndOrdersPage
                  activeMobileTab={mobileTab}
                  onCartChange={handleCartChange}
                  onOrdersChange={handleOrdersChange}
                />
              </main>
            </div>
            <MobileTabBar
              activeTab={mobileTab}
              onSelectTab={handleSelectMobileTab}
              cartUpdateCount={cartUpdateCount}
              ordersUpdateCount={ordersUpdateCount}
            />
          </>
        ) : (
          <HomePage onEnter={() => setPage('chat')} />
        )}
      </div>
    </>
  )
}

export default App
