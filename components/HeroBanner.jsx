import Link from 'next/link';
import React from 'react';

import { Raleway } from 'next/font/google';
const raleway = Raleway({ subsets: ['latin'] });

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        {/* <p className='beats-solo'>{heroBanner.smallText}</p> */}
        <h3>{heroBanner.midText}</h3>
        <h1 className={raleway.className}>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt='headphones'
          className='hero-banner-image'
        />
        <div>
          {/* <Link href={`/product/${heroBanner.product}`}> */}
          <Link href={`/`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          {/* <p>
          Style is the only thing you can&#39;t buy. It&#39;s not in a shopping
          bag, a label, or a price tag. It&#39;s something reflected from our
          soul to the outside world, an emotion.
        </p>
        <span>Alber Elbaz</span> */}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
