import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyWebsite</div>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <a className="text-gray-300 hover:text-white">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-300 hover:text-white">About</a>
          </Link>
          <Link href="/services">
            <a className="text-gray-300 hover:text-white">Services</a>
          </Link>
          <Link href="/contact">
            <a className="text-gray-300 hover:text-white">Contact</a>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-700 p-4">
          <Link href="/">
            <a className="block text-gray-300 hover:text-white">Home</a>
          </Link>
          <Link href="/about">
            <a className="block text-gray-300 hover:text-white">About</a>
          </Link>
          <Link href="/services">
            <a className="block text-gray-300 hover:text-white">Services</a>
          </Link>
          <Link href="/contact">
            <a className="block text-gray-300 hover:text-white">Contact</a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
