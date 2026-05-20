import { Check, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface ArtistOption {
  id: string;
  name: string;
}

interface ArtistSelectProps {
  value: string;
  artists: ArtistOption[];
  onChange: (value: string) => void;
}

export function ArtistSelect({ value, artists, onChange }: ArtistSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedArtists = useMemo(
    () => [...artists].sort((a, b) => a.name.localeCompare(b.name)),
    [artists],
  );

  const selectedArtist = useMemo(
    () => sortedArtists.find((artist) => artist.id === value),
    [sortedArtists, value],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full sm:w-65">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-3 bg-input-background border-2 border-border rounded-lg
                   text-sm focus:outline-none focus:border-primary transition-colors duration-200
                   cursor-pointer flex items-center justify-between gap-3"
      >
        <span className="truncate">
          {selectedArtist?.name ?? "All Artists"}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div
          className="absolute z-30 mt-2 w-full bg-input-background border-2 border-border
                     rounded-lg shadow-lg p-1"
        >
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className={`w-full px-3 py-2 rounded-md text-left text-sm flex items-center justify-between
                       hover:bg-muted/50 transition-colors duration-150 ${
                         value === "" ? "bg-muted/40" : ""
                       }`}
          >
            <span>All Artists</span>
            {value === "" ? <Check className="h-4 w-4 text-primary" /> : null}
          </button>

          <div className="my-1 h-px bg-border" />

          <div className="max-h-64 overflow-y-auto">
            {sortedArtists.map((artist) => (
              <button
                key={artist.id}
                type="button"
                onClick={() => {
                  onChange(artist.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-md text-left text-sm flex items-center justify-between
                           hover:bg-muted/50 transition-colors duration-150 ${
                             value === artist.id ? "bg-muted/40" : ""
                           }`}
              >
                <span className="truncate">{artist.name}</span>
                {value === artist.id ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
