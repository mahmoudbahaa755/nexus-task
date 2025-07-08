import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppRoutes from "./routes";

function AppContent() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleToggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        onToggleFilters={handleToggleFilters}
        isFiltersOpen={isFiltersOpen}
      />

      <AppRoutes
        isFiltersOpen={isFiltersOpen}
        onToggleFilters={handleToggleFilters}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
