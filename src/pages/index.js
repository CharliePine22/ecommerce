import React, { useState } from 'react';
import { client } from '../../lib/client';
import {
  Product,
  FooterBanner,
  HeroBanner,
  CategoryBanner,
} from '../../components';
import { Libre_Baskerville } from 'next/font/google';
const libre = Libre_Baskerville({ subsets: ['latin'], weight: '700' });

const Home = ({ products, bannerData, categoryData }) => {
  const topSellers = products?.slice(0, 5);
  categoryData.sort((a, b) => a.order - b.order);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[1]} />
      <div className='categories-wrapper'>
        <h3>Explore</h3>
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
      </div>
      <div className='products-heading'>
        <h2>Featured Items</h2>
        <p>So much variety, you can&#39;t not find something for you!</p>
      </div>
      <div className='products-container'>
        {topSellers?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
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
  categoryData = categoryData.filter((item) => item.title !== 'Womens');
  return {
    props: { products, bannerData, categoryData },
  };
};

export default Home;
