const MENU_ITEM_NAMES = {
    burger: "Burger",
    fries: "Fries",
    pizza: "Pizza",
    clamChowder: "Clam Chowder",
    grilledCheese: "Grilled Cheese",
    tomatoSoup: "Tomato Soup"
}

type MenuItemFieldName = keyof typeof MENU_ITEM_FIELD_NAME
const MENU_ITEM_FIELD_NAME = {
    burger: "burger",
    fries: "fries",
    pizza: "pizza",
    clamChowder: "clamChowder",
    grilledCheese: "grilledCheese",
    tomatoSoup: "tomatoSoup"
}

class MenuItem{
    constructor(
        public name: string,
        public price: number
    ){}
}

const MENU: Record<MenuItemFieldName,MenuItem> = {
    burger: new MenuItem(MENU_ITEM_NAMES.burger, 9),
    fries: new MenuItem(MENU_ITEM_NAMES.fries, 4),
    pizza: new MenuItem(MENU_ITEM_NAMES.pizza, 5),
    grilledCheese: new MenuItem(MENU_ITEM_NAMES.grilledCheese, 7),
    clamChowder: new MenuItem(MENU_ITEM_NAMES.clamChowder, 5.50),
    tomatoSoup: new MenuItem(MENU_ITEM_NAMES.tomatoSoup, 4.50),
}

function menuItemFieldNameToMenuItem(menuItemFieldName: MenuItemFieldName){
    return MENU[menuItemFieldName]
}

export {MENU_ITEM_NAMES, MenuItem, MENU, MenuItemFieldName, menuItemFieldNameToMenuItem}