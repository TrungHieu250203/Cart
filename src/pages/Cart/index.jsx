import { useGlobalContext } from "../../Context";
import CartItem from "../CartItem";
function Cart() {
    const { cart, clearCart, total } = useGlobalContext();
    if(cart.length === 0) {
        return (
            <div>
                <p style={{ fontSize: '2.5rem' }}>is currently empty</p>
            </div>
        )
    }
    return <div>
        {cart.map(product => {
            return <CartItem key={product.id} {...product} />
        })}
        <hr />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: '2rem', marginRight: '150px' }}>Total</p>
            <p style={{ fontSize: '2rem' }}>{total}</p>
        </div>
        {cart.length > 0 && <button onClick={clearCart}>Clear</button>}
    </div>;
}

export default Cart;