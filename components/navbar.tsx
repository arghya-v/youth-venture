import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { useAuth } from '@/context/AuthContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '500'],
});

const Navbar = () => {
  const { user, profile, signInWithGoogle, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSharkTankOpen, setIsSharkTankOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSharkTankOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full border-b-2 border-gray-300 z-50 ${poppins.className}`}
      style={{
        backgroundColor: '#f2f2f2',
      }}
    >
      <nav className="flex items-center p-6 w-screen max-w-screen-xl mx-auto">
        {/* Mobile Logo and Menu Button */}
        <div className="md:hidden flex items-center justify-between w-full">
          <button
            onClick={toggleMenu}
            className="text-black text-xl p-2"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>

          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 transition-transform hover:scale-110"
          >
            <Image
              src="/youthlogo.png"
              alt="Logo"
              width={48}
              height={48}
              className="h-12 border-2 border-gray-300 rounded-full"
            />
          </Link>

          <div className="invisible">
            {/* Placeholder to balance the menu button */}
            <Menu size={28} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-grow">
          <Link
            href="/"
            className="mr-10 transition-transform transform hover:scale-110"
          >
            <Image
              src="/youthlogo.png"
              alt="Youth Venture"
              width={64}
              height={64}
              className="h-16 border-2 border-gray-300 rounded-full"
            />
          </Link>
          {['About', 'Team', 'Media', 'Contact','Events'].map((label) => (
            <Link
              key={label}
              href={`/${label.toLowerCase().replace(' ', '')}`}
              className="mr-10 font-medium text-[#396d93] transition-transform transform hover:scale-110"
            >
              {label}
            </Link>
          ))}
          
          {/* Shark Tank Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsSharkTankOpen(!isSharkTankOpen)}
              className="flex items-center font-medium text-[#6b7280] hover:text-[#396d93] transition-colors"
            >
              Shark Tank
              <ChevronDown size={16} className="ml-1" />
            </button>
            
            {isSharkTankOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {['Submit', 'Pitches', 'Leaderboard', 'Judge', 'Results'].map((label) => (
                  <Link
                    key={label}
                    href={`/${label.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#396d93]"
                    onClick={() => setIsSharkTankOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Dropdown */}
          <div className="relative ml-4" ref={userDropdownRef}>
            {user ? (
              <>
                <button
                  onClick={() => setIsUserOpen(!isUserOpen)}
                  className="flex items-center font-medium text-[#6b7280] hover:text-[#396d93] transition-colors"
                >
                  <User size={16} className="mr-1" />
                  {profile?.displayName || user.email}
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {isUserOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium">{profile?.displayName || user.email}</div>
                      {profile?.roles && (
                        <div className="text-xs text-gray-500 uppercase">{profile.roles.join(', ')}</div>
                      )}
                    </div>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserOpen(false)}
                    >
                      Account
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsUserOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center font-medium text-[#6b7280] hover:text-[#396d93] transition-colors"
              >
                <User size={16} className="mr-1" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="fixed left-0 right-0 bg-white text-black shadow-lg">
          <div className="flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[#396d93]">Menu</span>
              <button
                onClick={toggleMenu}
                className="text-2xl"
                aria-label="Close menu"
              >
                <X />
              </button>
            </div>
            {['About', 'Team', 'Media', 'Contact','Events'].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase().replace(' ', '')}`}
                className="py-2 font-medium text-[#5474a5] transition-colors duration-200 hover:text-[#365b76]"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            
            {/* Shark Tank Mobile Links */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Shark Tank</div>
              {['Submit', 'Pitches', 'Leaderboard', 'Judge', 'Results'].map((label) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase()}`}
                  className="py-2 font-medium text-[#6b7280] hover:text-[#396d93] transition-colors duration-200 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Auth Mobile Links */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              {user ? (
                <div>
                  <div className="py-2">
                    <div className="text-sm font-medium">{profile?.displayName || user.email}</div>
                    {profile?.roles && (
                      <div className="text-xs text-gray-500 uppercase">{profile.roles.join(', ')}</div>
                    )}
                  </div>
                  <Link
                    href="/login"
                    className="py-2 font-medium text-[#6b7280] hover:text-[#396d93] transition-colors duration-200 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="py-2 font-medium text-red-600 hover:text-red-700 transition-colors duration-200 block w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signInWithGoogle();
                    setIsMenuOpen(false);
                  }}
                  className="py-2 font-medium text-[#6b7280] hover:text-[#396d93] transition-colors duration-200 block w-full text-left"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
