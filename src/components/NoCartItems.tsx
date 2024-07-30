import React from 'react';
import { useCartContext } from '../CartProvider';
import pngProductNotFound from '../assets/product-not-found.png';

function NoCartItems() {
  const { classNameNoItems } = useCartContext();
  return (
    <div className={classNameNoItems}>
      <img src={pngProductNotFound.src} alt="Cart items not found" width={276} height={215} />
      <p>No cart items.</p>
    </div>
  );
}

export default NoCartItems;
