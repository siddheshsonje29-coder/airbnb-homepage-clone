import React from 'react';
import { Star, Heart, MapPin, Sparkles } from 'lucide-react';
import type { Property } from '../../data/mockData';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { wishlistIds, toggleWishlist } = useWishlistStore();
  const isWishlisted = wishlistIds.includes(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop navigation to details page
    e.stopPropagation();
    toggleWishlist(property.id);
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative flex flex-col w-full bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
    >
      <Link to={`/property/${property.id}`} className="flex flex-col h-full" aria-label={`View details of ${property.title} in ${property.location}`}>
        
        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-104"
          />
          
          {/* Category Badge */}
          <div className="absolute left-3 top-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm dark:bg-zinc-900/90 flex items-center gap-1">
            <Sparkles className="h-3 w-3 inline text-primary animate-pulse" />
            <span>{property.category}</span>
          </div>

          {/* Favorite Wishlist Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-zinc-600 shadow-md hover:scale-110 active:scale-90 dark:bg-zinc-900/90 dark:text-zinc-350 transition-all cursor-pointer"
            aria-label={isWishlisted ? `Remove ${property.title} from wishlist` : `Add ${property.title} to wishlist`}
          >
            <Heart 
              className={`h-4.5 w-4.5 transition-colors ${
                isWishlisted ? "fill-primary text-primary" : "text-zinc-650 dark:text-zinc-350"
              }`} 
            />
          </button>

          {/* Availability Bar Overlay */}
          <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/60 backdrop-blur-[2px] px-2.5 py-1.5 text-[10px] font-semibold text-white tracking-wide">
            {property.availability}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-1.5">
            {/* Title & Rating */}
            <div className="flex items-start justify-between gap-1">
              <h3 className="font-extrabold text-sm text-zinc-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500 flex-shrink-0" aria-label={`Rating: ${property.rating} stars`}>
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span>{property.rating}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-550 dark:text-zinc-400">
              <MapPin className="h-3.5 w-3.5 text-zinc-400" />
              <span className="truncate">{property.location}</span>
            </div>
            
            {/* Rooms Info */}
            <p className="text-[10px] text-zinc-450 dark:text-zinc-500 font-semibold uppercase tracking-wider">
              {property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''} • {property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''} • {property.maxGuests} Guests
            </p>
          </div>

          {/* Pricing */}
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-baseline justify-between">
            <span className="text-[10px] uppercase font-bold text-zinc-400">Rate per night</span>
            <div className="text-sm font-extrabold text-primary">
              ₹{property.pricePerNight.toLocaleString()}{" "}
              <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-450">/ night</span>
            </div>
          </div>
        </div>

      </Link>
    </motion.div>
  );
};
