"use client";

import { TYPE_COLORS } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

interface PokemonTypeSelectProps {
  value: string;
  onChange: (type: string) => void;
}

const POKEMON_TYPES = Object.keys(TYPE_COLORS);

export function PokemonTypeSelect({ value, onChange }: PokemonTypeSelectProps) {
  const options = useMemo(() => {
    return POKEMON_TYPES.map((type) => ({
      value: type,
      label: type,
      color: TYPE_COLORS[type] || "#666",
    }));
  }, []);

  return (
    <div className="relative w-full sm:w-65">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full px-3 py-2 bg-input-background border border-border rounded-lg
                   text-foreground text-sm placeholder-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                   hover:bg-input-background/80 transition-colors cursor-pointer
                   pr-8"
      >
        <option value="">All Types</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>

      {value && (
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full pointer-events-none"
          style={{ backgroundColor: TYPE_COLORS[value] || "#666" }}
        />
      )}
    </div>
  );
}
