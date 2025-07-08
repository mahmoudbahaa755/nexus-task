import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  onToggleFilters: () => void;
  isFiltersOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleFilters, isFiltersOpen }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Film className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">MovieFinder</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Discover Amazing Movies</p>
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            {/* Filter Toggle */}
            {isHomePage && (
              <Button
                variant="outline"
                size="icon"
                onClick={onToggleFilters}
                className="lg:hidden"
                aria-label="Toggle filters"
              >
                {isFiltersOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}

            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;