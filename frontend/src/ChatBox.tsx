import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { BACKEND_URL } from './config'
import './ChatBox.css'

function ChatBox() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: `${BACKEND_URL}/api/chat` }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <div className="chatbox">
      <div className="chatbox-messages">
        {messages.length === 0 && (
          <p className="chatbox-empty">Ask me anything about your order...</p>
        )}
        {messages.map((message) => (
          <div key={message.id} className={`chatbox-message ${message.role}`}>
            {message.parts.map((part, i) =>
              part.type === 'text' ? <span key={i}>{part.text}</span> : null,
            )}
          </div>
        ))}
      </div>
      <form className="chatbox-form" onSubmit={handleSubmit}>
        <input
          className="chatbox-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="chatbox-send"
          type="submit"
          disabled={status !== 'ready'}
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatBox
