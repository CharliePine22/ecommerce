import React from 'react';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

const ProductOptions = (product) => {
  function onSelect({ key }) {
    console.log(`${key} selected`);
  }

  function onVisibleChange(visible) {
    console.log(visible);
  }

  const determineCategory = () => {
    switch (product.product.category) {
      case 'Clothing':
      case 'Shoes':
        return 'Sizes';
      case 'Electronics':
      case 'Accessories':
        return 'Colors';
    }
  };

  const menu = (
    <Menu onSelect={onSelect}>
      {product?.product.sizes.map((item, i) => (
        <>
          <MenuItem key={item}>{item}</MenuItem>
          {i !== product.product.sizes.length - 1 && <Divider />}
        </>
      ))}
    </Menu>
  );
  return (
    <div style={{ margin: '15px 0 0px' }}>
      <div>
        <Dropdown
          trigger={['click']}
          overlay={menu}
          animation='slide-up'
          onVisibleChange={onVisibleChange}
        >
          <button style={{ width: 100 }}>{determineCategory()}</button>
        </Dropdown>
      </div>
    </div>
  );
  // return <div className='product-options-dropdown-container'></div>;
};

export default ProductOptions;
