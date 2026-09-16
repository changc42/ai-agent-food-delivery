import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { MENU } from "./models/MenuItem.js"
import { cartRoutes } from './http/routes/CartRoutes.js'
import { orderRoutes } from './http/routes/OrderRoutes.js'
import { chatRoutes } from './http/routes/ChatRoutes.js'
import morgan from 'morgan'

console.log("latest version!")
const app = express()
const port = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json())
app.use(morgan("dev"));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/menu', (_req, res) => {
  res.json({ menu: MENU })
})

app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/chat', chatRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist"));
}

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
