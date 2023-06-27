import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { BsStarFill } from 'react-icons/bs';
import { Product, ProductOptions, RatingStars } from '../../../components';
import { useStateContext } from '../../../context/StateContext';
import Image from 'next/image';

const ProductDetails = ({ product, relatedProducts }) => {
  const { image, name, details, price, reviews } = product;
  const { decreaseQuantity, increaseQuantity, quantity, onAdd, setShowCart } =
    useStateContext();
  const [currentOption, setCurrentOption] = useState(null);
  const [index, setIndex] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  // Calculate the median rating for the product and return the nearest whole number in filled stars
  const determineRatingStars = () => {
    const calculatedRating =
      reviews.reduce((partialSum, a) => partialSum + a, 0) / reviews.length;
    return calculatedRating;
  };

  useEffect(() => {
    setCurrentOption(null);
    if (!reviews) return;
    setAverageRating(determineRatingStars());
  }, [reviews]);

  const handleBuyNow = () => {
    onAdd(product, quantity);
    setShowCart(true);
  };

  const selectProductOption = (item) => {
    setCurrentOption(item);
  };

  const myLoader = ({ src, width, quality }) => {
    return `${src}?q=${100}`;
  };

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <Image
              loader={myLoader}
              src={`${urlFor(image[index])}`}
              layout='fill'
              className='product-detail-image'
              style={{
                objectFit:
                  image[index].asset._ref.slice(-3) == 'jpg'
                    ? 'fill'
                    : 'contain',
              }}
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <Image
                src={`${urlFor(item)}`}
                layout='fill'
                loader={myLoader}
                key={item._key}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
                style={{
                  objectFit:
                    image[index].asset._ref.slice(-3) == 'jpeg'
                      ? 'cover'
                      : 'contain',
                }}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>

          {/* Product Rating */}
          <div className='reviews'>
            <div style={{ marginTop: '5px' }}>
              <RatingStars precision={0.5} product={product} />
            </div>
            <p>({reviews ? reviews.length : 0})</p>
            <div className='average-rating-container'>
              <BsStarFill /> <p>{averageRating.toFixed(2)}</p>
            </div>
          </div>

          <h4>Details:</h4>
          <p>{details}</p>

          {/* Product Options (Sizing and Colors) */}
          {product && product.sizes && (
            <ProductOptions
              product={product}
              selectProductOption={(option) => selectProductOption(option)}
              currentOption={currentOption}
            />
          )}

          {/* Product Price and Cart Options */}
          <p className='price'>${price.toFixed(2)}</p>
          <div className='quantity'>
            <h3>Quantity</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={() => decreaseQuantity()}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{quantity}</span>
              <span className='plus' onClick={() => increaseQuantity()}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(product, quantity, currentOption)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {relatedProducts.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  try {
    const paths = products.map((product) => ({
      params: {
        slug: product.slug.current,
      },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (e) {
    console.log(e);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug
  );

  return {
    props: { relatedProducts, product },
  };
};

export default ProductDetails;
