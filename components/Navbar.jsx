import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from '.';
import { useRouter } from 'next/router';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
// import logo from '/assets/Logo/logo-no-background.png';

const Navbar = () => {
  const [scrolling, setScrolling] = useState();
  const [width, setWidth] = useState(null);
  const router = useRouter();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (!window) return;
    const currentWidth = window.innerWidth;
    setWidth(currentWidth);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [width]);

  const isMobile = width <= 768;

  const menSubcategories = [
    'All',
    'Shirts',
    'Tanks',
    'Sweaters',
    'Jackets',
    'Pants',
    'Shoes',
  ];

  const womenSubcategories = [
    'All',
    'Dresses',
    'Jackets',
    'Shirts',
    'Shoes',
    'Sweaters',
    'Pants',
    'Tanks',
  ];

  const accessorySubcategories = [
    'All',
    'Bags',
    'Shoes',
    'Watches',
    'Ties',
    'Video Games',
  ];

  const onVisibleChange = (visible) => {
    return visible;
  };

  const handleNavigation = (category, subcategory) => {
    if (subcategory == 'All') router.push(`/category/${category}`);
    else {
      router.push(`/category/${category}`, {
        query: {
          subcategory: subcategory,
        },
      });
    }
  };

  // Dropdown Options
  const menMenu = (
    <Menu>
      {menSubcategories.map((item, i) => (
        <React.Fragment key={item}>
          <MenuItem
            key={item}
            className='product-option'
            onClick={() => handleNavigation('men', item)}
          >
            {item}
          </MenuItem>
          {i != menSubcategories.length - 1 && (
            <Divider className='product-option-divider' />
          )}
        </React.Fragment>
      ))}
    </Menu>
  );

  // Dropdown Options
  const womenMenu = (
    <Menu>
      {womenSubcategories.map((item, i) => (
        <React.Fragment key={item}>
          <MenuItem
            key={item}
            className='product-option'
            onClick={() => handleNavigation('women', item)}
          >
            {item}
          </MenuItem>
          {i != womenSubcategories.length - 1 && (
            <Divider className='product-option-divider' />
          )}
        </React.Fragment>
      ))}
    </Menu>
  );

  // Dropdown Options for Accessories
  const accessoriesMenu = (
    <Menu>
      {accessorySubcategories.map((item, i) => (
        <React.Fragment key={item}>
          <MenuItem
            key={item}
            className='product-option'
            onClick={() => handleNavigation('accessories', item)}
          >
            {item}
          </MenuItem>
          {i !== accessorySubcategories.length - 1 && (
            <Divider className='product-option-divider' />
          )}
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
          <img src={'/assets/Logo/jcj_logo_w_trans.png'} alt='JCJ Swag Logo' />
        </Link>
      </p>

      <div className='navbar-options-container'>
        <div className='navbar-options-item'>
          {' '}
          <Dropdown
            trigger={[isMobile ? 'click' : 'hover']}
            overlay={menMenu}
            animation='slide-up'
            onVisibleChange={onVisibleChange}
            placement='bottomLeft'
          >
            <Link
              onClick={(event) => (isMobile ? event.preventDefault() : null)}
              href='/category/men'
            >
              MEN
            </Link>
          </Dropdown>
        </div>
        <div className='navbar-options-item'>
          <Dropdown
            trigger={[isMobile ? 'click' : 'hover']}
            overlay={womenMenu}
            animation='slide-up'
            onVisibleChange={onVisibleChange}
          >
            <Link
              onClick={(event) => (isMobile ? event.preventDefault() : null)}
              href={isMobile ? '' : '/category/women'}
            >
              WOMEN
            </Link>
          </Dropdown>
        </div>
        <div className='navbar-options-item'>
          <Dropdown
            trigger={[isMobile ? 'click' : 'hover']}
            overlay={accessoriesMenu}
            animation='slide-up'
            onVisibleChange={onVisibleChange}
          >
            <Link
              onClick={(event) => (isMobile ? event.preventDefault() : null)}
              href='/category/accessories'
            >
              ACCESSORIES
            </Link>
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
