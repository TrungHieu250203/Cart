import { createContext, useEffect, useReducer, useContext } from "react";
import data from './data';
console.log(data); 

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = createContext();

const initState = {
    loading: false,
    cart: data,
    total: 0,
    amount: 0
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            }
        case 'REMOVE': 
            return {
                ...state,
                cart: state.cart.filter(cartItem => {
                    return cartItem.id !== action.payload;
                })
            }
        case 'INCREASE':
            let increase = state.cart.map(cartItem => {
                if(cartItem.id === action.payload) {
                    return {
                        ...cartItem,
                        amount: cartItem.amount + 1
                    }
                }
                return cartItem;
            });
            return {
                ...state,
                cart: increase
            }
        case 'DECREASE': 
            let decrease = state.cart.map(cartItem => {
                if(cartItem.id === action.payload) {
                    if(cartItem.amount === 1) {
                        return null;
                    }
                    return {
                        ...cartItem,
                        amount: cartItem.amount - 1
                    }
                }
                return cartItem;
            });
            decrease = decrease.filter(cartItem => cartItem !== null);
            return {
                ...state,
                cart: decrease
            }
        case 'LOADING':
            return {
                ...state, 
                loading: true
            }
        case 'DISPLAY_PRODUCT':
            return {
                ...state,
                cart: action.payload,
                loading: false
            }
        case 'GET_TOTALS':
            const { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            const itemTotal = price * amount;
                cartTotal.total += itemTotal;
                cartTotal.amount += amount;
                return cartTotal;
            }, {
                total: 0,
                amount: 0
            });
            return {
                ...state,
                total,
                amount
            }
        default:
            throw new Error('Unknown action !');
    }
}

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART'
        });
    }

    const removeProduct = (id) => {
        dispatch({
            type: 'REMOVE',
            payload: id
        });
    }

    const increaseProduct = (id) => {
        dispatch({
            type: 'INCREASE',
            payload: id
        });
    }

    const decreaseProduct = (id) => {
        dispatch({
            type: 'DECREASE',
            payload: id
        });
    }

    useEffect(() => {
        const getProducts = async() => {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({
                type: 'DISPLAY_PRODUCT',
                payload: data
            })
        }
        getProducts();
    }, []);

    useEffect(() => {
        dispatch({ type: 'GET_TOTALS' })
    }, [state.cart]);

    return (
        <AppContext.Provider value={{...state, clearCart, removeProduct, increaseProduct, decreaseProduct}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider };