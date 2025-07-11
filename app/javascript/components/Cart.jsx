// app/javascript/components/Cart.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Cart = ({ products, initialItems, total, notice }) => {
  console.log('Cart component rendered with props:', { products, initialItems, total, notice });
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.code || '');

  const handleAddItem = async (e) => {
    e.preventDefault();
    console.log('Adding item:', selectedProduct);
    const response = await fetch('/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
      },
      body: new URLSearchParams({ product_code: selectedProduct }),
    });
    if (response.redirected) {
      window.location.href = response.url;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div>DEBUG: Cart component loaded</div>
      <h1 className="text-2xl font-bold mb-4">Cash Register</h1>
      {notice && <p className="text-green-500 mb-4">{notice}</p>}
      <form onSubmit={handleAddItem} className="mb-4">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border p-2 mr-2"
        >
          {products.map((product) => (
            <option key={product.code} value={product.code}>
              {product.name} (€{product.price.toFixed(2)})
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add to Cart
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-2">Cart</h2>
      <ul className="mb-4">
        {initialItems.map((item, index) => (
          <li key={index}>
            {item.product.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <p className="text-lg font-bold">Total: €{total.toFixed(2)}</p>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  initialItems: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  notice: PropTypes.string,
};

export default Cart;