import img1 from '../Assets/Images/nike-shoes.png'
import img2 from '../Assets/Images/adidas-campus.png'
import img3 from '../Assets/Images/Puma.png'

const initial = {
    products: [
        {
            title: "Nike Shoes",
            price: 5000,
            img: img1,
            variant: {
                size: ["7", "8", "9", "10", "11"]
            }
        },
        {
            title: "Adidas Shoes",
            price: 2000,
            img: img2,
            variant: {
                size: ["6", "7", "8", "9", "10"]
            }
        },
        {
            title: "Puma Shoes",
            price: 3000,
            img: img3,
            variant: {
                size: ["6", "7", "8", "9", "10"]
            }
        }
    ],
    cart: []
}

const processor = (state = initial, action) => {
    let tempCart = [...state.cart]
    switch (action.type) {
        case 'addItem':
            if (state.cart.length === 0) {
                const newItem = { ...state.products[action.payload], qty: 1 }
                return { ...state, cart: [newItem] };
            }
            else {
                const tempCart = [...state.cart]
                const checkCart = tempCart.some((e) => {
                    if (e.title === state.products[action.payload].title) {
                        e.qty++;
                        return true
                    }
                })

                if (!checkCart) {
                    const newItem = { ...state.products[action.payload], qty: 1 };
                    return { ...state, cart: [...state.cart, newItem] };
                } else {
                    return { ...state, cart: tempCart };
                }
            }

        case 'increment':
            tempCart[action.payload].qty++;
            return { ...state, cart: tempCart };
        case 'decrement':
            tempCart[action.payload].qty--;
            if (tempCart[action.payload].qty == 0) { tempCart.splice([action.payload], 1) }
            return { ...state, cart: tempCart };
        case 'delete':
            tempCart = [];
            return { ...state, cart: tempCart };
        default:
            return state
    }
}

export default processor