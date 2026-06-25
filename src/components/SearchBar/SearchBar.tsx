import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plus, Minus } from 'lucide-react';
import { usePropertyStore } from '../../store/usePropertyStore';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  compact?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ compact = false }) => {
  const { searchFilters, setSearchFilters } = usePropertyStore();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(searchFilters.destination);
  const [checkIn, setCheckIn] = useState(searchFilters.checkIn);
  const [checkOut, setCheckOut] = useState(searchFilters.checkOut);
  const [guests, setGuests] = useState(searchFilters.guests);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters({
      destination,
      checkIn,
      checkOut,
      guests
    });
    // Redirect to home page if not already there, so search takes effect
    navigate("/");
  };

  const adjustGuests = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      setGuests(prev => Math.min(prev + 1, 15));
    } else {
      setGuests(prev => Math.max(prev - 1, 1));
    }
  };

  if (compact) {
    return (
      <form 
        onSubmit={handleSearch}
        className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-full py-1.5 pl-5 pr-2 shadow-sm hover:shadow-md transition-all w-full max-w-lg"
      >
        <input 
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Anywhere • Any week • Add guests"
          className="bg-transparent border-none text-xs font-semibold text-zinc-700 dark:text-zinc-300 focus:outline-none w-full placeholder:text-zinc-400"
          aria-label="Compact search input"
        />
        <button
          type="submit"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover active:scale-95 transition-all cursor-pointer"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex flex-col md:flex-row items-center w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl md:rounded-full p-2 gap-2 md:gap-0 shadow-xl transition-all"
    >
      {/* Destination Field */}
      <div className="flex-1 w-full px-5 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-2xl md:rounded-full transition-colors flex items-center gap-3">
        <MapPin className="h-5 w-5 text-zinc-400 flex-shrink-0" />
        <div className="flex flex-col w-full">
          <label htmlFor="search-dest" className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            Where
          </label>
          <input
            id="search-dest"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search destinations (e.g. Bali, Malibu)"
            className="bg-transparent border-none text-sm font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="hidden md:block h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

      {/* Check In Field */}
      <div className="flex-1 w-full px-5 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-2xl md:rounded-full transition-colors flex items-center gap-3">
        <Calendar className="h-5 w-5 text-zinc-400 flex-shrink-0" />
        <div className="flex flex-col w-full">
          <label htmlFor="search-in" className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            Check-in
          </label>
          <input
            id="search-in"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-transparent border-none text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none w-full color-scheme-light dark:color-scheme-dark"
          />
        </div>
      </div>

      <div className="hidden md:block h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

      {/* Check Out Field */}
      <div className="flex-1 w-full px-5 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-2xl md:rounded-full transition-colors flex items-center gap-3">
        <Calendar className="h-5 w-5 text-zinc-400 flex-shrink-0" />
        <div className="flex flex-col w-full">
          <label htmlFor="search-out" className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            Check-out
          </label>
          <input
            id="search-out"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-transparent border-none text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none w-full color-scheme-light dark:color-scheme-dark"
          />
        </div>
      </div>

      <div className="hidden md:block h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

      {/* Guests Field */}
      <div className="relative flex-1 w-full px-5 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-2xl md:rounded-full transition-colors flex items-center justify-between">
        <div 
          className="flex items-center gap-3 w-full cursor-pointer"
          onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
        >
          <Users className="h-5 w-5 text-zinc-400 flex-shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Who
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
              {guests} guest{guests > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Search Icon button */}
        <button
          type="submit"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover active:scale-95 transition-all shadow-md md:absolute md:right-2 md:top-2 cursor-pointer flex-shrink-0"
          aria-label="Submit search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Guests Dropdown Panel */}
        {showGuestsDropdown && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowGuestsDropdown(false)} />
            <div className="absolute right-0 top-full mt-3 z-20 w-64 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">Guests</span>
                  <span className="text-[11px] text-zinc-500">Ages 13 or above</span>
                </div>
                
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => adjustGuests('dec')}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 hover:border-zinc-950 text-zinc-650 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-white transition-all cursor-pointer"
                    disabled={guests <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center dark:text-white">{guests}</span>
                  <button
                    type="button"
                    onClick={() => adjustGuests('inc')}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 hover:border-zinc-950 text-zinc-650 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-white transition-all cursor-pointer"
                    disabled={guests >= 15}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </form>
  );
};
