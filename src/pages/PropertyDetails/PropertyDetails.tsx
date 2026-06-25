import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockProperties } from '../../data/mockData';
import { usePropertyStore } from '../../store/usePropertyStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { WeatherWidget } from '../../components/WeatherWidget/WeatherWidget';
import { MapSection } from '../../components/MapSection/MapSection';
import { 
  Star, 
  Heart, 
  MapPin, 
  ChevronLeft, 
  Wifi, 
  Car, 
  Flame, 
  Coffee, 
  HelpCircle, 
  ShieldCheck,
  Compass,
  ArrowRight,
  Maximize2,
  Minimize2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToRecentlyViewed, trackCategoryVisit } = usePropertyStore();
  const { wishlistIds, toggleWishlist } = useWishlistStore();

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null);

  // 360 Panorama state
  const [panoramaOffset, setPanoramaOffset] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const property = mockProperties.find(p => p.id === id);

  useEffect(() => {
    if (property) {
      addToRecentlyViewed(property.id);
      trackCategoryVisit(property.category);
      window.scrollTo(0, 0);
    }
  }, [property, id, addToRecentlyViewed, trackCategoryVisit]);

  if (!property) {
    return (
      <div className="text-center py-20 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950">
        <h2 className="text-2xl font-bold dark:text-white mb-2">Property Not Found</h2>
        <p className="text-zinc-500 mb-6">The accommodation details you requested are unavailable.</p>
        <Link to="/" className="bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-hover transition-colors">
          Go Back Home
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlistIds.includes(property.id);

  // Amenity Icon Mapper
  const getAmenityIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'wi-fi': return <Wifi className="h-5 w-5" />;
      case 'pool':
      case 'plunge pool': return <Compass className="h-5 w-5" />;
      case 'kitchen': return <Coffee className="h-5 w-5" />;
      case 'free parking': return <Car className="h-5 w-5" />;
      case 'ac': return <Flame className="h-5 w-5" />;
      case 'fireplace': return <Flame className="h-5 w-5" />;
      default: return <HelpCircle className="h-5 w-5" />;
    }
  };

  // 360 Panorama handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    startX.current = e.clientX;
    // Adjust offset within 0 to 100 percentage range
    setPanoramaOffset(prev => {
      const next = prev - delta * 0.15;
      return next < 0 ? 100 : next > 100 ? 0 : next;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const triggerBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-300 pb-20">
      
      {/* Detail Header Navigation */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <button 
          onClick={() => toggleWishlist(property.id)}
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-850 dark:hover:bg-zinc-900 hover:shadow-sm transition-all"
        >
          <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-primary text-primary' : 'text-zinc-550'}`} />
          <span>{isWishlisted ? "Wishlisted" : "Save Stay"}</span>
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        
        {/* Title Block */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            {property.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-semibold text-zinc-550 dark:text-zinc-400">
            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
              <Star className="h-4 w-4 fill-amber-500" />
              <span>{property.rating}</span>
              <span className="text-zinc-400 dark:text-zinc-500 font-medium">({property.reviewsCount} reviews)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 font-bold">
              <MapPin className="h-4 w-4 text-zinc-400" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[21/9] relative shadow-md">
          {/* Main Large Image */}
          <div className="md:col-span-2 h-full overflow-hidden relative cursor-pointer group" onClick={() => setFullscreenImage(0)}>
            <img 
              src={property.images[0]} 
              alt={property.title} 
              className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </div>

          {/* Secondary images */}
          <div className="hidden md:flex flex-col gap-2 h-full">
            <div className="h-1/2 overflow-hidden relative cursor-pointer group" onClick={() => setFullscreenImage(1)}>
              <img 
                src={property.images[1] || property.images[0]} 
                alt="Property interior" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
              />
            </div>
            <div className="h-1/2 overflow-hidden relative cursor-pointer group" onClick={() => setFullscreenImage(2)}>
              <img 
                src={property.images[2] || property.images[0]} 
                alt="Property deck" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
              />
            </div>
          </div>

          {/* Third images */}
          <div className="hidden md:flex flex-col gap-2 h-full">
            <div className="h-1/2 overflow-hidden relative cursor-pointer group" onClick={() => setFullscreenImage(0)}>
              <img 
                src={property.images[0]} 
                alt="Property room" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
              />
            </div>
            <div className="h-1/2 overflow-hidden relative cursor-pointer group" onClick={() => setFullscreenImage(1)}>
              <img 
                src={property.images[1] || property.images[0]} 
                alt="Property view" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
              />
            </div>
          </div>

          {/* Show All Images Button overlay */}
          <button 
            onClick={() => setFullscreenImage(0)}
            className="absolute bottom-4 right-4 bg-white/95 text-zinc-900 border border-zinc-200 shadow px-4 py-2 rounded-xl text-xs font-bold hover:scale-103 dark:bg-zinc-900/95 dark:text-white dark:border-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer z-10"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Show All Photos</span>
          </button>
        </div>

        {/* 2-Column Info & Booking Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
          
          {/* Details Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Host info and stats */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Entire {property.category} stay hosted by {property.hostName}
                </h3>
                <p className="text-xs font-semibold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
                  {property.maxGuests} Guests • {property.bedrooms} Bedrooms • {property.bathrooms} Bathrooms
                </p>
              </div>
              <img 
                src={property.hostAvatar} 
                alt={property.hostName} 
                className="h-12 w-12 rounded-full border border-zinc-200 dark:border-zinc-700 object-cover shadow-sm"
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                About this space
              </h3>
              <p className="text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium">
                {property.description}
              </p>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            {/* Amenities */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-3.5 border border-zinc-150 dark:border-zinc-850 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20"
                  >
                    <div className="text-primary">{getAmenityIcon(amenity)}</div>
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-350">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            {/* 360 Virtual Tour Panorama */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Virtual 360° Property Preview
                </h3>
              </div>
              <p className="text-xs text-zinc-550 dark:text-zinc-400">
                Click and drag your mouse across the preview window to pan around the room and inspect the interior.
              </p>

              {/* Panorama Box */}
              <div 
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ 
                  backgroundImage: `url(${property.images[1] || property.images[0]})`,
                  backgroundPositionX: `${panoramaOffset}%`,
                  backgroundSize: '240% 100%',
                }}
                className={`w-full h-80 rounded-2xl relative shadow-inner overflow-hidden border border-zinc-200 dark:border-zinc-800 cursor-grab select-none active:cursor-grabbing flex items-center justify-center`}
              >
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                
                {/* 360 UI badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/75 text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 shadow pointer-events-none">
                  <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>360° SIMULATOR</span>
                </div>

                <div className="text-center text-white pointer-events-none drop-shadow-md flex flex-col items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-black/40 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-[1px]">
                    Drag to look around
                  </span>
                </div>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            {/* Weather integration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <WeatherWidget city={property.city} />
              
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 p-5 rounded-2xl space-y-3.5 h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-450 uppercase tracking-wider mb-2">Airbnb Protection</h4>
                  <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-350 font-medium">
                    Every booking includes free protection from Host cancellations, listing inaccuracies, and other check-in issues.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 fill-emerald-500/20" />
                  <span>Verified Airbnb Guarantee Enabled</span>
                </div>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            {/* Map Area */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Where you'll be
              </h3>
              <div className="h-72 w-full rounded-2xl overflow-hidden shadow-sm">
                <MapSection 
                  properties={[property]} 
                  center={[property.latitude, property.longitude]} 
                  zoom={12} 
                  selectedPropertyId={property.id} 
                />
              </div>
            </div>

          </div>

          {/* Booking Widget Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-lg transition-all space-y-5">
              <div className="flex items-baseline justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="text-lg font-black text-primary">
                  ₹{property.pricePerNight.toLocaleString()}
                  <span className="text-xs text-zinc-500 font-medium"> / night</span>
                </div>
                
                <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{property.rating}</span>
                </div>
              </div>

              <form onSubmit={triggerBooking} className="space-y-4">
                
                {/* Inputs */}
                <div className="rounded-xl border border-zinc-250 dark:border-zinc-700 overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-750">
                  <div className="grid grid-cols-2">
                    <div className="p-3">
                      <label className="block text-[8px] font-black text-zinc-800 dark:text-zinc-300 uppercase tracking-widest mb-1">Check-in</label>
                      <input type="date" required className="w-full bg-transparent border-none text-xs font-semibold focus:outline-none dark:text-white" />
                    </div>
                    <div className="p-3 border-l border-zinc-200 dark:border-zinc-750">
                      <label className="block text-[8px] font-black text-zinc-800 dark:text-zinc-300 uppercase tracking-widest mb-1">Check-out</label>
                      <input type="date" required className="w-full bg-transparent border-none text-xs font-semibold focus:outline-none dark:text-white" />
                    </div>
                  </div>

                  <div className="p-3">
                    <label className="block text-[8px] font-black text-zinc-800 dark:text-zinc-300 uppercase tracking-widest mb-1">Guests</label>
                    <select className="w-full bg-transparent border-none text-xs font-semibold focus:outline-none dark:text-white">
                      {Array.from({ length: property.maxGuests }).map((_, i) => (
                        <option key={i} value={i + 1} className="dark:bg-zinc-900">{i + 1} guest{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Math breakdown */}
                <div className="space-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-350">
                  <div className="flex justify-between">
                    <span>₹{property.pricePerNight.toLocaleString()} x 3 nights</span>
                    <span className="font-bold text-zinc-850 dark:text-white">₹{(property.pricePerNight * 3).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Airbnb cleaning fee</span>
                    <span className="font-bold text-zinc-850 dark:text-white">₹2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform service fee</span>
                    <span className="font-bold text-zinc-850 dark:text-white">₹1,800</span>
                  </div>
                  <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 mt-3 flex justify-between text-sm font-bold text-zinc-900 dark:text-white">
                    <span>Total before taxes</span>
                    <span className="text-primary text-base font-extrabold">₹{(property.pricePerNight * 3 + 4300).toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-3 text-xs font-bold transition-all hover:shadow shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Reserve Accommodation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="text-center text-[10px] text-zinc-450 font-semibold uppercase tracking-wider">
                You won't be charged yet
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Booking Confirmation Dialog Modal */}
      <AnimatePresence>
        {bookingSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingSuccess(false)}
              className="absolute inset-0 bg-black"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center space-y-4"
            >
              <div className="mx-auto h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center text-primary dark:bg-rose-955/35">
                <Sparkles className="h-6 w-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-extrabold dark:text-white">Booking Reserved!</h3>
              <p className="text-xs text-zinc-550 leading-relaxed dark:text-zinc-400">
                Congratulations, your reservation for <span className="font-semibold text-zinc-800 dark:text-white">{property.title}</span> has been confirmed. View details in your user profile.
              </p>
              <button 
                onClick={() => {
                  setBookingSuccess(false);
                  navigate("/profile");
                }}
                className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Go to Profile
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Photo Gallery Overlay Modal */}
      <AnimatePresence>
        {fullscreenImage !== null && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4">
            <div className="flex justify-between items-center text-white">
              <span className="text-xs font-bold uppercase tracking-widest">{property.title}</span>
              <button 
                onClick={() => setFullscreenImage(null)}
                className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition-colors cursor-pointer"
              >
                <Minimize2 className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center max-h-[80vh]">
              <motion.img 
                key={fullscreenImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                src={property.images[fullscreenImage] || property.images[0]} 
                alt="Fullscreen interior"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" 
              />
            </div>

            {/* Selector footer */}
            <div className="flex justify-center gap-3 overflow-x-auto py-4">
              {property.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setFullscreenImage(i)}
                  className={`h-16 w-24 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                    fullscreenImage === i ? 'border-primary opacity-100 scale-102' : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={img} alt="Thumbnail selector" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
