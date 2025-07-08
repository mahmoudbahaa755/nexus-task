import { Calendar, ChevronDown, Film, Filter, X } from "lucide-react";
import React from "react";
import { movieTypes, years } from "../../constants/filter-options";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    type: string;
    year: string;
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

  const hasActiveFilters = filters.type || filters.year;

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
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
