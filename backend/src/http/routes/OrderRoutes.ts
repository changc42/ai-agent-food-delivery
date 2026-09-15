import { Router } from "express";
import { clearOrdersHistory, createOrder, orders } from "../../models/Orders.js";

const orderRoutes = Router()

orderRoutes.get('/', (_req, res) => {
  res.json({ orders })
})

orderRoutes.post('/', (_req, res) => {
  createOrder()
  res.json({ orders })
})

orderRoutes.post('/reset', (_req, res) => {
  clearOrdersHistory()
  res.json({ orders })
})

export {orderRoutes}