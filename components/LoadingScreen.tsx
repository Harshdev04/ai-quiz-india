import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="relative w-16 h-16 mb-8">
        <motion.span
          className="block w-16 h-16 border-4 border-slate-700 rounded-full"
        />
        <motion.span
          className="block w-16 h-16 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full absolute top-0 left-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <h2 className="text-xl font-medium text-white mb-2">Generating Questions</h2>
      <p className="text-slate-500 text-sm">
        Curating India-centric questions for you...
      </p>
    </div>
  );
};

export default LoadingScreen;