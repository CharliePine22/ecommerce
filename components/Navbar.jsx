import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from '.';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
// import logo from '/assets/Logo/logo-no-background.png';

const Navbar = () => {
  const [scrolling, setScrolling] = useState();
  const subcategories = [
    'Shirts',
    'Tanks',
    'Sweaters',
    'Jackets',
    'Pants',
    'Shoes',
    'Accessories',
  ];

  const accessorySubcategories = [
    'Bags',
    'Shoes',
    'Watches',
    'Ties',
    'Video Games',
  ];

  const onSelect = ({ option }) => {
    console.log(option);
  };

  const onVisibleChange = (visible) => {
    return visible;
  };

  const menu = (
    <Menu onSelect={onSelect}>
      {subcategories.map((item, i) => (
        <React.Fragment key={item}>
          <MenuItem
            key={item}
            className='product-option'
            onClick={() => console.log(i)}
          >
            {item}
          </MenuItem>
          <Divider />
        </React.Fragment>
      ))}
    </Menu>
  );

  const accessoriesMenu = (
    <Menu onSelect={onSelect}>
      {accessorySubcategories.map((item, i) => (
        <React.Fragment key={item}>
          <MenuItem key={item} className='product-option'>
            {item}
          </MenuItem>
          {i !== subcategories.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Menu>
  );

  useEffect(() => {
    // If the user scrolls down from the top of page, add a black background to the nav
    const scrollNavListener = () => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          setScrolling(true);
        } else setScrolling(false);
      });
    };
    scrollNavListener();

    return () => {
      window.removeEventListener('scroll', scrollNavListener);
    };
  }, []);

  const { totalQuantities, showCart, setShowCart } = useStateContext();
  return (
    <div className={`navbar-container ${scrolling && 'scrolling'}`}>
      <p className='logo'>
        <Link href='/'>
          <img src={'/assets/Logo/jcj-logo.png'} alt='JCJ Swag' />
        </Link>
      </p>

      <div className='navbar-options-container'>
        <div className='navbar-options-item'>
          {' '}
          <Dropdown
            trigger={['hover']}
            overlay={menu}
            animation='slide-up'
            onVisibleChange={onVisibleChange}
          >
            <Link href='/category/men'>MEN</Link>
          </Dropdown>
        </div>
        <div className='navbar-options-item'>
          <Dropdown
            trigger={['hover']}
            overlay={menu}
            animation='slide-up'
            onVisibleChange={onVisibleChange}
          >
            <Link href='/category/women'>WOMEN</Link>
          </Dropdown>
        </div>
        <div className='navbar-options-item'>
          <Dropdown
            trigger={['hover']}
            overlay={accessoriesMenu}
            animation='slide-up'
            onVisibleChange={onVisibleChange}
          >
            <Link href='/category/accessories'>ACCESSORIES</Link>
          </Dropdown>
        </div>
      </div>

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
