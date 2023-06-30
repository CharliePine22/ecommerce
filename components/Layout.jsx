import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStateContext } from '../context/StateContext';

const Layout = ({ children }) => {
  const { showCart } = useStateContext();

  useEffect(() => {
    if (showCart) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [showCart]);

  return (
    <div className='layout'>
      <Head>
        <title>JCJ Swag</title>
      </Head>
      <header
        style={{
          position: 'sticky',
          top: '16px',
          zIndex: '9999',
          // height: '70px',
        }}
      >
        <Navbar />
      </header>

      <main className='main-container'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
