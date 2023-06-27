import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { Raleway } from 'next/font/google';
const raleway = Raleway({ subsets: ['latin'] });

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  const myLoader = ({ src }) => {
    return `${src}?q=${100}`;
  };
  return (
    <div className='hero-banner-container'>
      <div>
        <h3>{heroBanner.midText}</h3>
        <h1 className={raleway.className}>{heroBanner.largeText1}</h1>
        <Image
          src={`${urlFor(heroBanner && heroBanner.image)}`}
          alt={heroBanner.title}
          className='hero-banner-image'
          loader={myLoader}
          layout='fill'
        />
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
