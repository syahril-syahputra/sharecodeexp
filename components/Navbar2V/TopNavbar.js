import React from 'react';
import {faEnvelope, faPhoneFlip} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const TopNavBar = () => {
  return (
    <header className="w-full hidden bg-top-navbar p-4 text-white px-10 md:flex md:justify-end">
      <div className=" flex items-center px-[4.4rem]">
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
    </header>
  );
};

export default TopNavBar;
