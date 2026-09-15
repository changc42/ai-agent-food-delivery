import { Router } from "express";
import { addItemToCart, cart, clearCart, removeItemFromCart } from "../../models/Cart.js";
import { cartItemBodySchema, menuItemFieldNameSchema } from "../HttpSchema.js";

const cartRoutes = Router()

cartRoutes.get('/', (_req, res) => {
  res.json({ cart })
})

cartRoutes.post('/items', (req, res) => {
  const parseResult = cartItemBodySchema.safeParse(req.body)
  if (!parseResult.success) {
    res.status(400).json({ error: 'Invalid or missing menuItemFieldName', issues: parseResult.error.issues })
    return
  }

  addItemToCart(parseResult.data.menuItemFieldName)
  res.json({ cart })
})

cartRoutes.delete('/items/:menuItemFieldName', (req, res) => {
  const parseResult = menuItemFieldNameSchema.safeParse(req.params.menuItemFieldName)
  if (!parseResult.success) {
    res.status(400).json({ error: 'Invalid menuItemFieldName', issues: parseResult.error.issues })
    return
  }

  removeItemFromCart(parseResult.data)
  res.json({ cart })
})

cartRoutes.post('/clear', (_req, res) => {
  clearCart()
  res.json({ cart })
})

export {cartRoutes}