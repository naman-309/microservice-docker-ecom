import { createContext, useContext, useState } from "react"

const CartContext = createContext()

function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([])


    // Add product to cart
    const addToCart = (product) => {

        setCartItems((currentItems) => {

            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            )

            // If product already exists, increase quantity
            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                )
            }

            // If product is new, add it with quantity 1
            return [
                ...currentItems,
                {
                    product,
                    quantity: 1,
                },
            ]
        })
    }


    // Remove product completely
    const removeFromCart = (productId) => {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.product.id !== productId
            )
        )
    }


    // Increase quantity
    const increaseQuantity = (productId) => {

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        )
    }


    // Decrease quantity
    const decreaseQuantity = (productId) => {

        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.product.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}


export function useCart() {
    return useContext(CartContext)
}


export default CartProvider

