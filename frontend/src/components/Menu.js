import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../api";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  let history = useHistory();

  useEffect(() => {
    api
      .getMenu()
      .then((data) => setMenu(data))
      .catch((err) => {
        history.push("/login");
      });
  }, [history]);

  const handleAddToCart = async (itemId) => {
    const cur = await api.addItemToCart(itemId);
    setCart(cur);
  };

  return (
    <>
      <h2>Menu items</h2>
      <table className="table">
        <tbody>
          {menu.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    type="button"
                    value="Add To Shopping Cart"
                    onClick={() => handleAddToCart(item.id)}
                    className="btn btn-primary"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>My shopping cart</h2>
      {cart.length === 0 && <p>No items found</p>}
      <table className="table">
        <tbody>
          {cart.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.totalPrice}</td>
                <td>{item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {cart.length !== 0 && (
        <input
          type="button"
          value="Checkout"
          onClick={() => history.push("/checkout")}
          className="btn btn-success"
        />
      )}
    </>
  );
}

export default Menu;
