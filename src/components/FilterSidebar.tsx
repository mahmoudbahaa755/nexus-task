import { Calendar, ChevronDown, Film, Filter, Star, X } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    type: string;
    year: string;
    genre: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [typeOpen, setTypeOpen] = React.useState(true);
  const [yearOpen, setYearOpen] = React.useState(true);
  const [genreOpen, setGenreOpen] = React.useState(true);

  const movieTypes = [
    { value: "_all_types_", label: "All Types" },
    { value: "movie", label: "Movies" },
    { value: "series", label: "TV Series" },
    { value: "episode", label: "Episodes" },
  ];

  const years = [
    { value: "_all_years_", label: "All Years" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2010-2019", label: "2010s" },
    { value: "2000-2009", label: "2000s" },
    { value: "1990-1999", label: "1990s" },
    { value: "1980-1989", label: "1980s" },
  ];

  const genres = [
    { value: "_all_genres_", label: "All Genres" },
    { value: "Action", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Animation", label: "Animation" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Documentary", label: "Documentary" },
    { value: "Drama", label: "Drama" },
    { value: "Family", label: "Family" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Horror", label: "Horror" },
    { value: "Mystery", label: "Mystery" },
    { value: "Romance", label: "Romance" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Thriller", label: "Thriller" },
    { value: "War", label: "War" },
    { value: "Western", label: "Western" },
  ];

  const hasActiveFilters = filters.type || filters.year || filters.genre;

  // Convert empty string filters to special "all" values for Select components
  const getSelectValue = (filterValue: string, allValue: string) => {
    return filterValue === "" ? allValue : filterValue;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-card border-r z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Clear Filters */}
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="w-full mb-6"
            disabled={!hasActiveFilters}
          >
            Clear All Filters
          </Button>

          {/* Type Filter */}
          <Collapsible open={typeOpen} onOpenChange={setTypeOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto mb-3"
              >
                <div className="flex items-center space-x-2">
                  <Film className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Type</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    typeOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mb-6">
              <Select
                value={getSelectValue(filters.type, "_all_types_")}
                onValueChange={(value) =>
                  onFilterChange("type", value === "_all_types_" ? "" : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {movieTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          {/* Year Filter */}
          <Collapsible open={yearOpen} onOpenChange={setYearOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto mb-3"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Year</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    yearOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mb-6">
              <Select
                value={getSelectValue(filters.year, "_all_years_")}
                onValueChange={(value) =>
                  onFilterChange("year", value === "_all_years_" ? "" : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          {/* Genre Filter */}
          <Collapsible open={genreOpen} onOpenChange={setGenreOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto mb-3"
              >
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Genre</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    genreOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mb-6">
              <Select
                value={getSelectValue(filters.genre, "_all_genres_")}
                onValueChange={(value) =>
                  onFilterChange("genre", value === "_all_genres_" ? "" : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.value} value={genre.value}>
                      {genre.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Active Filters</h3>
              <div className="space-y-2">
                {filters.type && (
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      Type:{" "}
                      {movieTypes.find((t) => t.value === filters.type)?.label}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => onFilterChange("type", "")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  </div>
                )}
                {filters.year && (
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      Year: {years.find((y) => y.value === filters.year)?.label}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => onFilterChange("year", "")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  </div>
                )}
                {filters.genre && (
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      Genre: {filters.genre}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => onFilterChange("genre", "")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
