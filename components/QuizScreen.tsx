import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Info } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizScreenProps {
  questions: QuizQuestion[];
  onComplete: (results: { questionIndex: number; selectedAnswer: string; isCorrect: boolean }[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [results, setResults] = useState<{ questionIndex: number; selectedAnswer: string; isCorrect: boolean }[]>([]);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(option);
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;
    
    setIsAnswerChecked(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const newResults = [
      ...results,
      { questionIndex: currentIndex, selectedAnswer, isCorrect }
    ];
    setResults(newResults);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      onComplete(results);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header / Progress */}
      <div className="flex items-center justify-between mb-6 px-1">
        <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
          Question {currentIndex + 1} <span className="text-slate-700">/ {questions.length}</span>
        </span>
        <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Question Card */}
          <div className="mb-8">
             <h2 className="text-2xl font-semibold text-white leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showResult = isAnswerChecked;
              
              let styles = "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 text-slate-300";
              let indicator = <div className="w-5 h-5 rounded-full border-2 border-slate-600 group-hover:border-slate-500 transition-colors" />;

              if (showResult) {
                if (isCorrect) {
                  styles = "bg-emerald-500/10 border-emerald-500/50 text-emerald-100";
                  indicator = <Check className="w-5 h-5 text-emerald-500" />;
                } else if (isSelected) {
                  styles = "bg-red-500/10 border-red-500/50 text-red-100";
                  indicator = <X className="w-5 h-5 text-red-500" />;
                } else {
                  styles = "bg-slate-800/30 border-slate-800 text-slate-600 opacity-60";
                  indicator = <div className="w-5 h-5 rounded-full border-2 border-slate-800" />;
                }
              } else if (isSelected) {
                styles = "bg-orange-500/10 border-orange-500/50 text-orange-100 shadow-[0_0_0_1px_rgba(249,115,22,0.1)]";
                indicator = (
                  <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswerChecked}
                  className={`
                    w-full text-left p-4 rounded-xl border transition-all duration-200 group flex items-center gap-4
                    ${styles}
                  `}
                >
                  <div className="shrink-0">
                    {indicator}
                  </div>
                  <span className="font-medium text-base">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {isAnswerChecked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-slate-800 rounded-xl border border-slate-700/50"
              >
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Insight</span>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-end">
        {!isAnswerChecked ? (
          <button
            onClick={handleCheck}
            disabled={!selectedAnswer}
            className={`
              px-8 py-3.5 rounded-xl font-medium text-sm transition-all
              ${selectedAnswer 
                ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg shadow-white/10' 
                : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
              }
            `}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3.5 bg-white text-slate-900 font-medium rounded-xl hover:bg-slate-100 flex items-center gap-2 text-sm shadow-lg shadow-white/10 transition-colors"
          >
            {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;