import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Check, X, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../types';

interface ResultScreenProps {
  score: number;
  total: number;
  history: { questionIndex: number; selectedAnswer: string; isCorrect: boolean }[];
  questions: QuizQuestion[];
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, history, questions, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl w-full mx-auto"
    >
      {/* Score Card */}
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700/50 text-center mb-10 shadow-xl">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Score</span>
        <div className="flex items-center justify-center gap-2 my-2">
           <span className="text-6xl font-bold text-white tracking-tighter">{score}</span>
           <span className="text-3xl text-slate-600 font-light">/ {total}</span>
        </div>
        <p className={`text-sm font-medium mb-8 ${percentage >= 70 ? 'text-emerald-400' : 'text-orange-400'}`}>
          {percentage >= 80 ? "Excellent knowledge!" : percentage >= 50 ? "Good effort!" : "Keep learning!"}
        </p>

        <button
          onClick={onRestart}
          className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Start New Quiz
        </button>
      </div>

      {/* Analysis */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4 px-2">
          <div className="h-px bg-slate-800 flex-1"></div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Review Answers</span>
          <div className="h-px bg-slate-800 flex-1"></div>
        </div>

        {questions.map((q, idx) => {
          const result = history.find(h => h.questionIndex === idx);
          const isCorrect = result?.isCorrect;

          return (
            <div 
              key={idx}
              className="bg-slate-900/50 rounded-xl p-6 border border-slate-800"
            >
              <div className="flex gap-4">
                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                  isCorrect 
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' 
                    : 'border-red-500/20 bg-red-500/10 text-red-500'
                }`}>
                  {isCorrect ? <Check size={14} /> : <X size={14} />}
                </div>
                
                <div className="flex-1 space-y-3">
                  <p className="text-slate-200 font-medium text-base">{q.question}</p>
                  
                  <div className="text-sm space-y-2">
                     {/* Show selected if wrong */}
                     {!isCorrect && (
                       <div className="flex items-center gap-2 text-red-400/80">
                         <X size={14} />
                         <span>{result?.selectedAnswer}</span>
                       </div>
                     )}
                     {/* Always show correct answer */}
                     <div className="flex items-center gap-2 text-emerald-400/90 font-medium">
                       <Check size={14} />
                       <span>{q.correctAnswer}</span>
                     </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-800/50">
                    {q.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ResultScreen;