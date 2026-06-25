import React from 'react';
import { Star, Clock, User, Award } from 'lucide-react';
import type { Experience } from '../../data/mockData';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-150 dark:bg-zinc-800">
        <img
          src={experience.image}
          alt={experience.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-104"
        />

        {/* Experience Category Badge */}
        <div className="absolute left-3 top-3 bg-black/60 backdrop-blur-[2px] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
          <Award className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          <span>{experience.category}</span>
        </div>

        {/* Rating overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-xs font-bold text-amber-500 dark:bg-zinc-900/90 flex items-center gap-0.5">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          <span>{experience.rating}</span>
        </div>

        {/* Info overlay inside image (gives high-end immersive look) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-4 flex flex-col justify-end text-white">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-200 mb-1">
            <Clock className="h-3 w-3 text-primary" />
            <span>{experience.duration}</span>
            <span>•</span>
            <User className="h-3 w-3 text-zinc-300" />
            <span className="truncate">Hosted by {experience.hostName}</span>
          </div>

          <h3 className="font-extrabold text-sm text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {experience.title}
          </h3>
        </div>
      </div>

      {/* Details Box below */}
      <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-bold text-zinc-400">Price per guest</span>
          <span className="text-sm font-extrabold text-primary">₹{experience.price.toLocaleString()}</span>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 group-hover:bg-primary group-hover:text-white transition-colors">
          Book Session
        </span>
      </div>

    </motion.div>
  );
};
