import {Navbar} from 'flowbite-react';
import Image from 'next/image';
import ImageLogo from '../ImageLogo/ImageLogo';
import Link from 'next/link';
import LoginButton from '../Navbars/LoginButton';
import {useEffect, useState} from 'react';

const BottomNavbar = (props) => {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  });

  return (
    <nav
      className={`${
        navbar ? 'bg-slate-50' : 'bg-white bg-opacity-[.45]'
      } w-full fixed flex flex-wrap items-center justify-between  z-50 py-3 px-2 navbar-expand-lg`}
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <Link href={'/'}>
          <div className="relative object-center">
            <ImageLogo size={100} />
          </div>
        </Link>
        <div className="flex space-x-4 items-center ">
          <Link href="/auth/register" className="text-black font-bold text-sm">
            REGISTER
          </Link>
          {!props.hideLogin && (
            <LoginButton
              navBarV2={true}
              className="bg-[#3730A3
     ] z-10"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;
