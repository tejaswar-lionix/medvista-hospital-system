"use client";

import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterOption {
  value: string;
  label: string;
}

interface Filter {
  name: string;
  label: string;
  options: FilterOption[];
  value?: string;
}

interface FilterBarProps {
  filters: Filter[];
  onFilterChange: (filterName: string, value: string) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  function handleClearAll() {
    filters.forEach((filter) => {
      onFilterChange(filter.name, "");
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-gray-50/50 p-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </div>

      {filters.map((filter) => (
        <Select
          key={filter.name}
          value={filter.value ?? ""}
          onValueChange={(val) => onFilterChange(filter.name, val)}
        >
          <SelectTrigger className="h-9 w-auto min-w-[140px] bg-white">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All {filter.label}</SelectItem>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      <Button variant="ghost" size="sm" onClick={handleClearAll}>
        Clear all
      </Button>
    </div>
  );
}
