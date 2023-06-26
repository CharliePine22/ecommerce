import React, { useState } from 'react';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

const ProductOptions = ({ product, selectProductOption, currentOption }) => {
  function onSelect({ key }) {
    selectProductOption(key);
  }

  function onVisibleChange(visible) {
    return visible;
  }

  const determineCategory = () => {
    switch (product.category) {
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
      {product?.sizes.map((item, i) => (
        <React.Fragment key={item}>
          <MenuItem key={item} className='product-option'>
            {item}
          </MenuItem>
          {i !== product.sizes.length - 1 && <Divider />}
        </React.Fragment>
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
          <button className='product-options-btn'>
            {currentOption ? currentOption : determineCategory()}
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default ProductOptions;
