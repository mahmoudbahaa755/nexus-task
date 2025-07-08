import { Film, Heart } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesStore";
import ThemeToggle from "./themeToggle";

export interface NavbarProps {
  onToggleFilters: () => void;
  isFiltersOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleFilters, isFiltersOpen }) => {
  const location = useLocation();
  const { favorites } = useFavoritesStore();
  const favoritesCount = favorites.length;

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

          {/* Navigation Links and Actions */}
          <div className="flex items-center space-x-4">
            {/* Favorites Link */}
            <Link
              to="/favorites"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                location.pathname === "/favorites"
                  ? "bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <div className="relative">
                <Heart
                  className={`h-5 w-5 ${
                    location.pathname === "/favorites" ? "fill-current" : ""
                  }`}
                />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                    {favoritesCount > 99 ? "99+" : favoritesCount}
                  </span>
                )}
              </div>
              {/* <span className="hidden sm:inline">Favorites</span> */}
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle
              onToggleFilters={onToggleFilters}
              isFiltersOpen={isFiltersOpen}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
