import {MenuItem, MenuItemFieldName, menuItemFieldNameToMenuItem, MENU} from "./MenuItem.js"

type CartEntry = {
    menuItem: MenuItem
    quantity: number
}

let cart: Partial<Record<MenuItemFieldName, CartEntry>> = {}

function addItemToCart(menuItemFieldName: MenuItemFieldName){
    const existingEntry = cart[menuItemFieldName]
    if(existingEntry !== undefined) {
        existingEntry.quantity += 1
    }else{
        cart[menuItemFieldName] = { menuItem: menuItemFieldNameToMenuItem(menuItemFieldName), quantity: 1 }
    }
}

function removeItemFromCart(menuItemFieldName: MenuItemFieldName){
    const existingEntry = cart[menuItemFieldName]
    if(existingEntry !== undefined) {
        if(existingEntry.quantity <= 1) delete cart[menuItemFieldName]
        else existingEntry.quantity -= 1
    }
}



function clearCart(){
    cart = {}
}

export {cart, addItemToCart, removeItemFromCart, clearCart, type CartEntry}