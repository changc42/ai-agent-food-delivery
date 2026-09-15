import { useState } from 'react'
import NavBar from './NavBar'
import HomePage from './pages/HomePage'
import CartAndOrdersPage from './pages/CartAndOrdersPage'
import ChatBox from './ChatBox'
import type { Page } from './types'
import './App.css'

function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [page, setPage] = useState<Page>('chat')

  if (!hasEntered) {
    return <HomePage onEnter={() => setHasEntered(true)} />
  }

  return (
    <>
      {page === 'chat' && <NavBar currentPage={page} onSelectPage={setPage} />}
      <div className={`app-shell${page === 'chat' ? ' bordered' : ''}`}>
        {page === 'chat' ? (
          <>
            <aside className="chat-sidebar">
              <ChatBox />
            </aside>
            <div className="app-main">
              <main className="page-content">
                <CartAndOrdersPage />
              </main>
            </div>
          </>
        ) : (
          <HomePage onEnter={() => setPage('chat')} />
        )}
      </div>
    </>
  )
}

export default App
