import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='border-t '>
      <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row   lg:justify-between gap-2 '>
        <p>© All Rights Reserved 2024</p>

        {/* Social media icons */}
        <div className='flex gap-4 items-center justify-center text-2xl'>
          <a
            href='https://www.facebook.com/r.maity.921/'
            className='hover:text-primary-100'
          >
            <FaFacebook />
          </a>
          <a
            href='https://www.instagram.com/ramesh_m907/'
            className='hover:text-primary-100'
          >
            <FaInstagram />
          </a>
          <a
            href='https://www.linkedin.com/in/ramesh-maity/'
            className='hover:text-primary-100'
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
