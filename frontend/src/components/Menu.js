import { useState, useEffect } from 'react';
import * as api from '../api';

function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    api.getMenu().then((data) => setMenu(data));
  }, []);

  return (
    <>
      {menu.map((item) => {
        return (
          <div key={item.id}>
            {item.name} - {item.price}
          </div>
        );
      })}
    </>
  );
}

export default Menu;
