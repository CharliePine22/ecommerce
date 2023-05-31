import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const CategoryBanner = ({ categoryBanner, index }) => {
  return (
    <div
      className={`category ${
        index == 2 && 'last_banner'
      } hero-banner-container`}
    >
      <div>
        <img
          src={urlFor(categoryBanner.image)}
          alt={`Image for ${categoryBanner.title} banner`}
          className='hero-banner-image'
        />
        {/* <div>
          <Link href={`/categories/${categoryBanner.title}`}>
            <button type='button'>{categoryBanner.title}</button>
          </Link>
        </div> */}
        <button type='button'>{categoryBanner.title}</button>
      </div>
    </div>
  );
};

export default CategoryBanner;
