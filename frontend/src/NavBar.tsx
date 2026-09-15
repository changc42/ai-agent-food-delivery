import { useState } from 'react'
import type { Page } from './types'
import './NavBar.css'

const PAGES: { id: Page; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'chat', label: 'Chat' },
]

interface NavBarProps {
  currentPage: Page
  onSelectPage: (page: Page) => void
}

function NavBar({ currentPage, onSelectPage }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (page: Page) => {
    onSelectPage(page)
    setIsOpen(false)
  }

  return (
    <header className="navbar">
      <button
        type="button"
        className="navbar-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="navbar-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <span className="navbar-title">Agentic AI Food Delivery</span>
      {isOpen && (
        <nav id="navbar-menu" className="navbar-menu">
          {PAGES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`navbar-menu-item${id === currentPage ? ' active' : ''}`}
              onClick={() => handleSelect(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

export default NavBar
