import { useState } from 'react';
import * as api from '../api';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cardNumber, setCardNumber] = useState('424242424242');
  let navigate = useNavigate();

  const handleCheckout = async () => {
    await api.checkout(cardNumber);
    navigate('/checkout-complete');
  };

  return (
    <>
      <h2>Checkout</h2>
      <label>
        Card Number:
        <input
          name='cardNumber'
          type='text'
          value='424242424242'
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </label>
      <br />

      <input
        type='button'
        value='Complete order'
        onClick={handleCheckout}
        className='btn btn-primary'
      />
    </>
  );
}

export default Checkout;
