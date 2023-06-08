import React, { useState } from 'react';
import { client, urlFor } from '../../../lib/client';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../../components';
import { useStateContext } from '../../../context/StateContext';

const Category = ({ category, products }) => {
  // const { image, name, details, price } = products;

  const { decreaseQuantity, increaseQuantity, quantity, onAdd, setShowCart } =
    useStateContext();
  const [index, setIndex] = useState(0);

  return <div></div>;
};

export const getStaticPaths = async () => {
  try {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }`;
    const products = await client.fetch(query);
    const test = products.map((item) => item.slug.current && item.slug);
    const paths = products.map((product) => ({
      params: {
        slug: product.slug.current,
      },
    }));
  } catch (error) {
    console.log(error);
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

  return {
    props: { products, product },
  };
};

export default Category;
