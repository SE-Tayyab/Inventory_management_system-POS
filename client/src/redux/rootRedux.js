const initialState = {
    loading: false,
    cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'showLoading':
            return {
                ...state,
                loading: true,
            };
        case 'hideLoading':
            return {
                ...state,
                loading: false,
            }
        case 'updateCart':
            const existingItemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (existingItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex].cartquantity += action.payload.cartquantity;
                return {
                    ...state,
                    cartItems: updatedCartItems
                };
            } else {
                // If the item doesn't exist in the cart, add it
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                };
            }

        case 'updateCartItem':
            const updatedCartItems = state.cartItems.map((item) =>
                item._id === action.payload._id ? { ...item, cartquantity: action.payload.cartquantity } : item
            );
            return {
                ...state,
                cartItems: updatedCartItems
            };
        case 'deleteCartItem':
            console.log("deleteCartItem");
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload._id)
            };


        default:
            return state;
    }
}
