import { useGlobalContext } from "../../Context";
import './style.css';

function CartItem({ id, img, title, price, amount }) {
    const { removeProduct, increaseProduct, decreaseProduct } = useGlobalContext();
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
        <img src={img} alt={title} style={{ marginLeft: '0' }}/>
        <div className='desc'>
            <h4>{title}</h4>
            <p>${price}</p>
            <button className='remove-btn' onClick={() => removeProduct(id)}>
              remove
            </button>
        </div>
        <div className='btn-list'>
          <button className='amount-btn' onClick={() => increaseProduct(id)}>
            +
          </button>
          <p>{amount}</p>
          <button className='amount-btn' onClick={() => decreaseProduct(id)}>
            -
          </button>
        </div>
    </div>;
}

export default CartItem;