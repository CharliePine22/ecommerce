import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>JCJ Swag</title>
      </Head>
      <header style={{ position: 'sticky', top: '16px', zIndex: '9999' }}>
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
