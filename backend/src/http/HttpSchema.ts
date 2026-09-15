import { MENU, MenuItemFieldName } from "../models/MenuItem.js"
import { z } from 'zod'

const menuItemFieldNames = Object.keys(MENU) as [MenuItemFieldName, ...MenuItemFieldName[]]
const menuItemFieldNameSchema = z.enum(menuItemFieldNames)
const cartItemBodySchema = z.object({ menuItemFieldName: menuItemFieldNameSchema })

export {menuItemFieldNameSchema, cartItemBodySchema}