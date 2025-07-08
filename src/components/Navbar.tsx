import { Film } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./themeToggle";

export interface NavbarProps {
  onToggleFilters: () => void;
  isFiltersOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleFilters, isFiltersOpen }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Film className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                OMDB movies
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Discover Amazing Movies
              </p>
            </div>
          </Link>

          {/* Navigation Actions */}
          <ThemeToggle
            onToggleFilters={onToggleFilters}
            isFiltersOpen={isFiltersOpen}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
