import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from '.';
// import logo from '/assets/Logo/logo-no-background.png';

const Navbar = () => {
  const { totalQuantities, showCart, setShowCart } = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
          <img src={'/assets/Logo/jcj-logo.png'} alt='JCJ Swag' />
        </Link>
      </p>

      <button
        type='button'
        className='cart-icon'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
