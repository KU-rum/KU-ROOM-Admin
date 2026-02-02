import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import CloseIcon from '@/assets/icons/close.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import logo from '@/assets/logo.svg';
import { cn } from '@/shared/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: '장소 내용 수정', href: '/place-content' },
  { label: '장소 이미지 수정', href: '/place-image' },
  { label: '장소 부가 이름 수정', href: '/place-subname' },
  { label: '위치 정보 수정', href: '/map' },
];

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <img
            src={logo}
            alt="KUROOM Logo"
            className="h-9 w-9 transition-transform duration-200 hover:scale-105"
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              KUROOM
            </h1>
            <span className="text-xs font-medium text-primary-600">Admin</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
                    location.pathname === item.href
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-primary-600',
                  )}
                >
                  {item.label}
                  {location.pathname === item.href && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary-500 transition-all duration-200" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Desktop Profile */}
          <button className="group hidden items-center gap-2 rounded-full border border-gray-200 py-1.5 pl-1.5 pr-3 transition-all duration-200 hover:border-primary-200 hover:bg-primary-50 lg:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-xs font-semibold text-white transition-transform duration-200 group-hover:scale-105">
              A
            </div>
            <span className="text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-primary-700">
              관리자
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-primary-600 lg:hidden"
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="border-t border-gray-100 bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={closeMenu}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200',
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
