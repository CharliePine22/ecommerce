import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Product from './Product';

const Pagination = ({ itemsPerPage, items }) => {
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </>
    );
  }

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // const
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel='<'
        renderOnZeroPageCount={null}
        className='category-products-list'
        activeClassName='current-page'
        activeLinkClassName='current-page'
        disabledLinkClassName='page-disabled'
      />
    </>
  );
};

export default Pagination;
