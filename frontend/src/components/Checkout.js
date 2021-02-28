import { useState } from "react";
import * as api from "../api";
import { useHistory } from "react-router-dom";

function Checkout() {
  const [cardNumber, setCardNumber] = useState("424242424242");
  let history = useHistory();

  const handleCheckout = async () => {
    await api.checkout(cardNumber);
    history.push("/checkout-complete");
  };

  return (
    <>
      <h2>Checkout</h2>
      <label>
        Card Number:
        <input
          name="cardNumber"
          type="text"
          value="424242424242"
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </label>
      <br />

      <input
        type="button"
        value="Complete order"
        onClick={handleCheckout}
        className="btn btn-primary"
      />
    </>
  );
}

export default Checkout;
