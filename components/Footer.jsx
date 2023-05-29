import React from 'react';
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineCopyrightCircle,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>
        {' '}
        <AiOutlineCopyrightCircle className='copyright-icon' /> 2023 JCJ Swag
        All rights reserved.
      </p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
