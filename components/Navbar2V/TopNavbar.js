import React from 'react';
import {faEnvelope, faPhoneFlip} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const TopNavBar = () => {
  return (
    <nav className=" bg-top-navbar text-white">
      <div className="w-full hidden md:flex flex-wrap justify-between items-center mx-auto px-2  py-3">
        <div className="flex items-center"></div>
        <div className="container flex items-center flex-wrap px-4 mx-auto justify-end">
          <ul className="items-center space-x-8  text-sm md:flex">
            <li className="group flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="h-[20px] text-[20px] text-white group-hover:scale-125 transition-all ease duration-200"
              />

              <label>
                <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] group-hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                  {
                    <a
                      href="mailto:sales@exepart.com?subject=%5BYour%20Purpose!%5D&body=Hi!"
                      arget="_blank"
                      rel="noopener noreferrer"
                    >
                      sales@exepart.com
                    </a>
                  }
                </span>
              </label>
            </li>
            <li className="group flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faPhoneFlip}
                className="h-[15px] text-[15px] text-white group-hover:scale-125 transition-all ease duration-200"
              />
              <label>
                <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] group-hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                  {<a href="tel:+128893341234">+12 889 334 1234</a>}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
