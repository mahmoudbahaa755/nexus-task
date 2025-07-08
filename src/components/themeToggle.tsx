import { Menu, Moon, Sun, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { NavbarProps } from "./Navbar";
import { Button } from "./ui/button";

export default function ThemeToggle({
  onToggleFilters,
  isFiltersOpen,
}: NavbarProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
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
          {isFiltersOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      )}

      {/* Dark Mode Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </Button>
    </div>
  );
}
