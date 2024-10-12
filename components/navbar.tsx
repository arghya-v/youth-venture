import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '500'],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className={`bg-transparent fixed top-0 left-0 w-full border-b-2 border-gray-300 z-50 ${poppins.className}`}>
      <nav className="flex items-center p-6 w-screen max-w-screen-xl mx-auto">
        {/* Mobile Logo and Menu Button */}
        <div className="md:hidden flex items-center justify-between w-full">
          <button onClick={toggleMenu} className="text-xl p-2" aria-label="Open menu">
            <Menu size={28} />
          </button>
          <Link href="/" className="flex-grow-0 mx-auto transition-transform transform hover:scale-110">
            <Image src="/youthlogo.png" alt="Logo" width={48} height={48} className="h-12" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-grow">
          <Link href="/" className="mr-10 transition-transform transform hover:scale-110">
            <Image src="/youthlogo.png" alt="Youth Venture" width={64} height={64} className="h-16" />
          </Link>
          {['About', 'Team', 'Mission', 'Contact'].map((label) => (
            <Link
              key={label}
              href={`/${label.toLowerCase().replace(' ', '')}`}
              className="mr-10 font-medium text-[#5474a5] transition-transform transform hover:scale-110"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="fixed left-0 right-0 bg-white text-black shadow-lg">
          <div className="flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[#5474a5]">Menu</span>
              <button onClick={toggleMenu} className="text-2xl" aria-label="Close menu">
                <X />
              </button>
            </div>
            {['About', 'Team', 'Mission', 'Contact'].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase().replace(' ', '')}`}
                className="py-2 font-medium text-[#5474a5] transition-colors duration-200 hover:text-[#365b76]" // Change to a darker color on hover
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
