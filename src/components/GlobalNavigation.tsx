'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// ナビゲーションリンクの定義
const navigation = [
  { name: 'Profile', href: '/' },
  { name: 'Service', href: '/service' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Works', href: '/works' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' },
];

export const GlobalNavigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-4 bg-paper1 border-b border-nezumi/20 sticky top-0 z-50 md:space-y-8 md:p-12">
      <div className="flex items-baseline md:flex-col">
        <Link href="/" className="text-3xl md:text-5xl tracking-widest">
          岡田 恋平
        </Link>
        <p className="text-xl md:text-2xl ml-4 md:mt-8 tracking-wider mt-2 text-nezumi">
          Renpei Okada
        </p>
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden absolute right-4 top-4 p-2"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-paper1 pt-20">
          <nav className="p-4">
            <ul className="space-y-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block text-lg py-2 ${
                      pathname === item.href
                        ? 'font-medium text-akane border-b-2 border-akane'
                        : 'text-font1 opacity-70 hover:opacity-100'
                    }`}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:block mt-8">
        <ul className="flex gap-1 sm:gap-2 md:gap-6 flex-wrap">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`text-sm relative px-1 py-2 transition-colors duration-300 text-font1 rounded-sm ${
                  pathname === item.href
                    ? 'font-medium border-b-2 border-akane'
                    : 'opacity-60 hover:opacity-100 border-b border-transparent'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};