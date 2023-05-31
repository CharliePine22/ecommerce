import React, { useState } from 'react';
import { client } from '../../lib/client';
import {
  Product,
  FooterBanner,
  HeroBanner,
  CategoryBanner,
} from '../../components';

const Home = ({ products, bannerData, categoryData }) => {
  const [productsFilter, setProductsFilter] = useState('TOP');
  const newReleases = products?.slice(-5);
  const topSellers = products?.slice(0, 5);
  categoryData.sort((a, b) => a.title.localeCompare(b.title)).reverse();

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[1]} />
      <div className='quote-container'>
        <p>
          Style is the only thing you can&#39;t buy. It&#39;s not in a shopping
          bag, a label, or a price tag. It&#39;s something reflected from our
          soul to the outside world, an emotion.
        </p>
        <span>Alber Elbaz</span>
      </div>
      <div className='categories-container'>
        {categoryData.length &&
          categoryData.map((category, i) => (
            <CategoryBanner
              key={category._id}
              categoryBanner={category}
              index={i}
            />
          ))}
      </div>
      <div className='products-heading'>
        <div className='products-filters'>
          <button
            style={{
              borderBottom: productsFilter === 'TOP' && '1px solid black',
              fontWeight: productsFilter === 'TOP' && '700',
            }}
            onClick={() => setProductsFilter('TOP')}
          >
            Top Sellers
          </button>
          <button
            styles={{
              borderBottom: productsFilter === 'NEW' && '1px solid black',
              fontWeight: productsFilter === 'NEW' && '700',
            }}
            onClick={() => setProductsFilter('NEW')}
          >
            New Releases
          </button>
        </div>
        <h2>
          {productsFilter === 'TOP' ? 'Top Selling Products' : 'New Releases'}
        </h2>
        <p>So much variety, you can't not find something for you!</p>
      </div>
      <div className='products-container'>
        {productsFilter === 'TOP'
          ? topSellers.map((product) => (
              <Product key={product._id} product={product} />
            ))
          : newReleases.map((product) => (
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
  const categoryQuery = '*[_type == "category"]';
  let bannerData = await client.fetch(bannerQuery);
  let categoryData = await client.fetch(categoryQuery);
  bannerData = bannerData.filter((item) => item.saleTime);
  return {
    props: { products, bannerData, categoryData },
  };
};

export default Home;
