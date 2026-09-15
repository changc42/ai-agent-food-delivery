import { tool } from "ai";
import {MENU_ITEM_NAMES, MENU, MenuItem, MenuItemFieldName} from "../../models/MenuItem.js"
import {z} from "zod"
import { clearCart, cart, type CartEntry } from "../../models/Cart.js";
import { createOrder } from "../../models/Orders.js";

function getMenu(): Record<string, MenuItem>{
    return Object.fromEntries(
        Object.entries(MENU).map(([key, item]) => [key, { ...item }])
    )
}

function updateCart(menuItemNamesAndQuantities: {menuItemFieldName: MenuItemFieldName, quantity: number}[]): string{
    clearCart()
    menuItemNamesAndQuantities.map(({menuItemFieldName, quantity}) => {
        cart[menuItemFieldName] = { menuItem: MENU[menuItemFieldName], quantity }
    })
    return `The cart was successfully updated to have ${JSON.stringify(menuItemNamesAndQuantities)}`
}

const menuItemFieldNameSchema = z.enum(
  Object.keys(MENU_ITEM_NAMES) as [
    MenuItemFieldName,
    ...MenuItemFieldName[]
  ]
);

const tools = {
    getMenuTool: tool({
        description: "Get the items on the menu",
        inputSchema: z.object({}),
        execute: () => {
            return getMenu()
        }
    }),
    getCartTool: tool({
        description: "See what is currently in the cart",
        inputSchema: z.object({}),
        execute: () => {
            return Object.fromEntries(
                Object.entries(cart).map(([key, entry]) => {
                    const { menuItem, quantity } = entry as CartEntry
                    return [key, { menuItem: { ...menuItem }, quantity }]
                })
            )
        }
    }),
    updateCartTool: tool({
        description: "Update items in the cart. The update is full replacement, so only the items that you input into this function will be present in the cart. Anything that was previously in the cart will not be there anymore.",
        inputSchema: z.object({
            menuItemNamesAndQuantities: z.array(
                z.object({
                    menuItemFieldName: menuItemFieldNameSchema,
                    quantity: z.number(),
                })
            ),
        }),
        execute: ({menuItemNamesAndQuantities}) => {
            return updateCart(menuItemNamesAndQuantities)
        }
    }),
    createOrderTool: tool({
        description: "Create an order with the items that are currently in the cart",
        inputSchema: z.object({}),
        execute: () => {
            createOrder()
        }
    })
}

export {tools}