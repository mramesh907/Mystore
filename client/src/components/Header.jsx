// import React from 'react';
import logo from '../assets/logo.png';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from 'react-icons/fa6';
import useMobile from '../hooks/useMobile';
import { BsCart4 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
// import { priceDiscount } from '../utils/PriceDiscount';
import { useGlobalContext } from '../provider/globalProvider';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCartSection, setOpenCartSection] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [totalItems, setTotalItems] = useState(0);

  const redirectToLoginPage = () => {
    navigate('/login');
  };
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };
  const handleMobileUser = () => {
    if (!user._id) {
      navigate('/login');
      return;
    }
    navigate('/user');
  };
  const DisplayPriceInRupees = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);

    const rupeeSymbol = formattedPrice.slice(0, 1); // Extract the `₹` symbol
    const remainingText = formattedPrice.slice(1); // Extract the rest of the price
    return (
      <span>
        <span style={{ fontFamily: 'Arial, sans-serif' }}>{rupeeSymbol}</span>
        <span style={{ fontFamily: 'Poppins, sans-serif' }}>
          {remainingText}
        </span>
      </span>
    );
  };
  const cartItem = useSelector((state) => state?.cartProduct?.cartProduct);
  // console.log('cartItem', cartItem);
  const { totalPrice, totalItems } = useGlobalContext();

  // total items and total price
  // useEffect(() => {
  //   const totalItems = cartItem.reduce(
  //     (total, item) => total + item.quantity,
  //     0
  //   );
  //   const totalPrice = cartItem.reduce(
  //     (total, item) =>
  //       total + priceDiscount(item.productId.price, item.productId.discount) * item.quantity,
  //     0
  //   );

  //   setTotalItems(totalItems);
  //   setTotalPrice(totalPrice);
  // }, [cartItem]);

  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
      {!(isSearchPage && isMobile) && (
        <div className='container mx-auto flex items-center px-2 justify-between'>
          {/* logo */}
          <div className='h-full'>
            <Link to={'/'} className='h-full flex justify-center items-center'>
              <img
                src={logo}
                width={170}
                height={60}
                alt='logo'
                className='hidden lg:block'
              />

              <img
                src={logo}
                width={120}
                height={60}
                alt='logo'
                className='lg:hidden'
              />
            </Link>
          </div>

          {/* search */}
          <div className='hidden lg:block'>
            <Search />
          </div>

          {/* login and my cart */}
          <div className=''>
            {/* user icons display in only mobile version */}
            <button
              className='text-neutral-600 lg:hidden'
              onClick={handleMobileUser}>
              <FaRegCircleUser size={26} />
            </button>

            {/* login and my cart display in only desktop version */}
            <div className='hidden lg:flex  items-center gap-10'>
              {user?._id ? (
                <div className='relative'>
                  <div
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className='flex select-none items-center gap-1 cursor-pointer'>
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className='absolute right-0 top-14'>
                      <div className='bg-white p-4 min-w-52 lg:shadow-lg rounded'>
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className='text-lg px-2'>
                  Login
                </button>
              )}

              <button
                onClick={() => setOpenCartSection(!openCartSection)}
                className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                {/* add to cart icon */}
                {/* <div className='animate-bounce'>
                  <BsCart4 size={26} />
                </div> */}

                {cartItem?.length > 0 ? (
                  <>
                    <div className='animate-bounce'>
                      <BsCart4 size={26} />
                    </div>
                    <div>
                      <p className='font-semibold'>{totalItems} Items</p>
                      <p className='font-semibold'>
                        {DisplayPriceInRupees(totalPrice)}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <BsCart4 size={26} />
                    </div>
                    <div className='font-semibold'>
                      <p>My Cart</p>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>
      {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}
    </header>
  );
};

export default Header;
