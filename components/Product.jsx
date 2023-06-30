import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  // Loader for image
  const myLoader = ({ src, width, quality }) => {
    return `${src}?q=${100}`;
  };

  return (
    <div style={{ maxWidth: '250px' }} className='product-container'>
      <Link href={`/product/${slug?.current}`}>
        <div className='product-card'>
          {image && (
            <Image
              loader={myLoader}
              src={`${urlFor(image[0])}`}
              fill={true}
              className='product-image'
              alt={name}
            />
          )}
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
