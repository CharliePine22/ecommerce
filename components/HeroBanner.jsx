import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { Raleway } from 'next/font/google';
const raleway = Raleway({ subsets: ['latin'] });

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  const myLoader = ({ src }) => {
    return `${src.split('?rect')[0]}?q=${100}`;
  };
  const homeBanner =
    heroBanner.image.asset._ref ==
    'image-cb50bc89093e8684b789c660ac31f976df8bb1bc-3589x4641-jpg';
  return (
    <div className='hero-banner-container'>
      <div>
        <h3>{heroBanner.midText}</h3>
        <h1 className={raleway.className}>{heroBanner.largeText1}</h1>
        {heroBanner && heroBanner.image && (
          <Image
            src={`${urlFor(heroBanner.image && heroBanner.image)}`}
            alt={`${heroBanner.title}`}
            className='hero-banner-image'
            loader={myLoader}
            fill={true}
            style={{ objectPosition: '50% 69%' }}
          />
        )}
        <div>
          <Link href={`/`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
