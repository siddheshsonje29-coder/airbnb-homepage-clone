import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFound: React.FC = () => {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-4 transition-colors">
      <div className="text-center space-y-6 max-w-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto h-20 w-20 bg-rose-50 rounded-full flex items-center justify-center text-primary dark:bg-rose-955/20 border border-primary/20 shadow-inner"
        >
          <Compass className="h-10 w-10 text-primary animate-spin" style={{ animationDuration: '8s' }} />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight text-primary">404</h1>
          <h2 className="text-xl font-bold dark:text-white">Page Not Found</h2>
          <p className="text-sm text-zinc-550 leading-relaxed dark:text-zinc-400">
            We can't seem to find the page you're looking for. The link might be broken or the URL might have changed.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow hover:shadow-md cursor-pointer"
        >
          <Home className="h-4 w-4" />
          <span>Return to Stays Homepage</span>
        </Link>
      </div>
    </div>
  );
};
