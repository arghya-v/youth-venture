import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '500'],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`bg-transparent flex justify-center w-full border-b-2 border-gray-300 ${poppins.className}`}>
      <nav className="flex items-center p-6 w-screen max-w-screen-xl">
        {/* Mobile Logo and Menu */}
        <div className="md:hidden flex items-center justify-between w-full">
          <button onClick={toggleMenu} className="text-xl p-2">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <a href="/" className="flex-grow-0 mx-auto transition-transform transform hover:scale-110">
            <img src="/youthlogo.png" alt="Logo" className="h-12" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-grow">
          <a href="/" className="mr-10 transition-transform transform hover:scale-110">
            <img src="/youthlogo.png" alt="Youth Venture" className="h-16" />
          </a>
          <Link href="/about" className="mr-10 font-medium text-[#5474a5] transition-transform transform hover:scale-110">
            About
          </Link>
          <Link href="/team" className="mr-10 font-medium text-[#5474a5] transition-transform transform hover:scale-110">
            Our Team
          </Link>
          <Link href="/mission" className="mr-10 font-medium text-[#5474a5] transition-transform transform hover:scale-110">
            Mission
          </Link>
          <Link href="/contact" className="mr-10 font-medium text-[#5474a5] transition-transform transform hover:scale-110">
            Contact
          </Link>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 bg-white text-black shadow-lg">
          <div className="flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[#5474a5]">Menu</span>
              <button onClick={toggleMenu} className="text-2xl" aria-label="Close menu">
                <X />
              </button>
            </div>
            <Link href="/about" className="py-1 font-medium text-[#5474a5] transition-transform transform hover:scale-110">
              About
            </Link>
            <Link href="/team" className="py-1 font-medium text-[#5474a5] transition-transform transform hover:scale-110">
              Our Team
            </Link>
            <Link href="/mission" className="py-1 font-medium text-[#5474a5] transition-transform transform hover:scale-110">
              Mission
            </Link>
            <Link href="/contact" className="py-1 font-medium text-[#5474a5] transition-transform transform hover:scale-110">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
