import React, { useState } from 'react';
import { client } from '../../../lib/client';
import { HeroBanner, Pagination, Product } from '../../../components';

const Category = ({ products, category, categoryBanner }) => {
  const [currentFilter, setCurrentFilter] = useState(null);
  products.sort((a, b) =>
    a.category == 'Clothing' ? -1 : b.category == 'Clothing' ? 1 : 0
  );

  // console.log(products);

  const filters = [
    'Shirts',
    'Tanks',
    'Sweaters',
    'Pants',
    'Jackets',
    'Shoes',
    'Accessories',
  ];

  const filteredProducts = products.filter(
    (product) => product.sub_category == currentFilter
  );
  console.log(filteredProducts);

  return (
    <div className='category-wrapper'>
      <HeroBanner heroBanner={categoryBanner} />
      <h3 className='category-title'>Shop {category}</h3>
      <div className='category-nav'>
        <div className='category-nav-list-container'>
          <ul className='category-nav-list'>
            {filters.map((filter) => (
              <li
                key={filter}
                onClick={() => setCurrentFilter(filter)}
                style={{
                  fontWeight: currentFilter == filter && '600',
                  textDecoration: currentFilter == filter && 'underline',
                  color: currentFilter == filter && 'dodgerblue',
                }}
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='category-container'>
        <Pagination itemsPerPage={10} items={products} />
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  try {
    const query = `*[_type == "category"] {
      title 
    }`;
    const products = await client.fetch(query);
    const paths = products.map((product) => ({
      params: {
        category: product.title.toLowerCase(),
      },
    }));
    return {
      paths: paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps = async ({ params: { category } }) => {
  let categoryInital = category.toUpperCase().slice(0)[0];
  // If shopping for Women, change W to "F"
  if (categoryInital == 'W') categoryInital = 'F';
  const productsQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';
  const products = await client.fetch(productsQuery);
  const banner = await client.fetch(bannerQuery);
  const categoryBanner = banner.filter(
    (product) => product.product.toLowerCase() == category
  );
  console.log(categoryInital);

  // Return all products that arent accessories
  let categoryList;
  if (categoryInital != 'A') {
    categoryList = products.filter(
      (product) => product.gender == categoryInital
    );
  } else {
    // Return accessories
    categoryList = products.filter((product) => !product.gender);
  }

  return {
    props: {
      products: categoryList,
      category: category,
      categoryBanner: categoryBanner[0],
    },
  };
};

export default Category;
