import React, { useState } from 'react';
import { client } from '../../lib/client';
import { Product, FooterBanner, HeroBanner } from '../../components';

const Home = ({ products, bannerData }) => {
  const [productsFilter, setProductsFilter] = useState('TOP');
  const newReleases = products?.slice(5);
  const topSellers = products?.slice(0, 5);
  // console.log(newReleases);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <div className='products-filters'>
          <button
            style={{
              borderBottom: productsFilter === 'TOP' && '1px solid black',
            }}
            onClick={() => setProductsFilter('TOP')}
          >
            Top Sellers
          </button>
          <button
            style={{
              borderBottom: productsFilter === 'NEW' && '1px solid black',
            }}
            onClick={() => setProductsFilter('NEW')}
          >
            New Releases
          </button>
        </div>
        <h2>Best Selling Products</h2>
        <p>Speakers of many varieties!</p>
      </div>
      <div className='products-container'>
        {products?.slice(0, 5)?.map((product) => (
          <Product key={product._id} product={product} />
        ))}{' '}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  let bannerData = await client.fetch(bannerQuery);
  bannerData = bannerData.filter((item) => item.saleTime);
  return {
    props: { products, bannerData },
  };
};

export default Home;
