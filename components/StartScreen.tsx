import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Music, FlaskConical, ScrollText, Globe2, Trophy, Cpu, Palette, ChevronRight, Search } from 'lucide-react';
import { QuizSettings } from '../types';

interface StartScreenProps {
  onStart: (settings: QuizSettings) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState<QuizSettings['difficulty']>('Medium');
  const [count, setCount] = useState(5);

  const categories = [
    { id: 'Indian Movies', label: 'Cinema', icon: <Film size={18} /> },
    { id: 'Indian Music', label: 'Music', icon: <Music size={18} /> },
    { id: 'Indian Science', label: 'Science', icon: <FlaskConical size={18} /> },
    { id: 'Indian History', label: 'History', icon: <ScrollText size={18} /> },
    { id: 'Indian Geography', label: 'Geography', icon: <Globe2 size={18} /> },
    { id: 'Indian Sports', label: 'Sports', icon: <Trophy size={18} /> },
    { id: 'Indian Tech', label: 'Tech', icon: <Cpu size={18} /> },
    { id: 'Indian Art & Culture', label: 'Culture', icon: <Palette size={18} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTopic = customTopic.trim() ? customTopic : selectedCategory;
    
    if (finalTopic) {
      onStart({ topic: finalTopic, difficulty, questionCount: count });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full"
    >
      <div className="text-center mb-10">
        <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-wide border border-orange-500/20 mb-4">
          INDIA EDITION
        </span>
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
          GenQuiz <span className="text-slate-500 font-light">AI</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          Test your knowledge about India. Choose a category or type your own topic to generate a unique quiz instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-1 shadow-xl backdrop-blur-sm">
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Categories Grid */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Select Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCustomTopic('');
                  }}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 group
                    ${selectedCategory === cat.id && !customTopic
                      ? 'bg-slate-700/80 border-orange-500/50 text-white shadow-lg shadow-orange-500/10' 
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-700/50 hover:border-slate-600 hover:text-slate-200'
                    }
                  `}
                >
                  <div className={`mb-2 ${selectedCategory === cat.id && !customTopic ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Or Custom Topic
            </label>
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-slate-500 w-4 h-4 group-focus-within:text-orange-400 transition-colors" />
               </div>
               <input
                type="text"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value);
                  setSelectedCategory('');
                }}
                placeholder="e.g., The Mughal Empire, ISRO Missions, Indian Street Food..."
                className={`w-full bg-slate-900/50 border rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                  customTopic 
                  ? 'border-orange-500/50 ring-orange-500/20' 
                  : 'border-slate-700/50 focus:border-slate-500 focus:ring-slate-500/20'
                }`}
              />
            </div>
          </div>

          {/* Settings Row */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Difficulty
              </label>
              <div className="relative">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full appearance-none bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-slate-500 transition-colors cursor-pointer"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Count
              </label>
              <div className="relative">
                <select
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full appearance-none bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-slate-500 transition-colors cursor-pointer"
                >
                  <option value={3}>3 Questions</option>
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-900/30 border-t border-slate-700/50 rounded-b-2xl">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={!selectedCategory && !customTopic}
            className={`w-full font-medium py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm ${
               !selectedCategory && !customTopic 
               ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
               : 'bg-white text-slate-900 hover:bg-slate-100 shadow-orange-900/10'
            }`}
          >
            Start Quiz
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default StartScreen;