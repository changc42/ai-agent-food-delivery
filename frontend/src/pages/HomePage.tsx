import './HomePage.css'

interface HomePageProps {
  onEnter?: () => void
}

function HomePage({ onEnter }: HomePageProps) {
  return (
    <div className="home-page">
      <h1 className="home-title">Food Delivery AI Agent</h1>
      <p className="home-author">Caleb Chang</p>
      <p className="home-description">
        This project showcases an ai agent that helps you order food. Just type into the chat box
        what foods you want, and the agent will update your cart and place your order accordingly.
      </p>
      {onEnter && (
        <button type="button" className="home-enter-button" onClick={onEnter}>
          Enter App
        </button>
      )}
    </div>
  )
}

export default HomePage
