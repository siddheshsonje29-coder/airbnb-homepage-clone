import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Logo } from '../components/Logo/Logo';

// Lazy loading pages with named exports mapped to defaults
const Home = React.lazy(() => import('../pages/Home/Home').then(m => ({ default: m.Home })));
const PropertyDetails = React.lazy(() => import('../pages/PropertyDetails/PropertyDetails').then(m => ({ default: m.PropertyDetails })));
const Wishlist = React.lazy(() => import('../pages/Wishlist/Wishlist').then(m => ({ default: m.Wishlist })));
const Experiences = React.lazy(() => import('../pages/Experiences/Experiences').then(m => ({ default: m.Experiences })));
const TravelPlanner = React.lazy(() => import('../pages/TravelPlanner/TravelPlanner').then(m => ({ default: m.TravelPlanner })));
const Profile = React.lazy(() => import('../pages/Profile/Profile').then(m => ({ default: m.Profile })));
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound').then(m => ({ default: m.NotFound })));
const Auth = React.lazy(() => import('../pages/Auth/Auth').then(m => ({ default: m.Auth })));

// Loading Fallback Spinner
const RouteLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white dark:bg-zinc-950 transition-colors">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin" style={{ animationDuration: '3s' }}>
        <Logo className="h-10 w-10" showText={false} />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
        Loading Airbnb...
      </span>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/planner" element={<TravelPlanner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
