import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const CategoryBanner = ({ categoryBanner, index }) => {
  return (
    <Link
      className={`category ${
        index == 2 && 'last_banner'
      } hero-banner-container`}
      href={`/category/${categoryBanner.title.toLowerCase()}`}
    >
      <div>
        <img
          src={urlFor(categoryBanner.image)}
          alt={`Image for ${categoryBanner.title} banner`}
          className='hero-banner-image'
        />
        <button type='button'>{categoryBanner.title}</button>
      </div>
    </Link>
  );
};

export default CategoryBanner;
