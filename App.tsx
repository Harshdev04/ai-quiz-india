import React, { useState } from 'react';
import { generateQuizQuestions } from './services/genAI';
import { AppStatus, QuizQuestion, QuizSettings } from './types';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import LoadingScreen from './components/LoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [history, setHistory] = useState<{ questionIndex: number; selectedAnswer: string; isCorrect: boolean }[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStart = async (settings: QuizSettings) => {
    setStatus(AppStatus.LOADING);
    setErrorMsg('');
    try {
      const generatedQuestions = await generateQuizQuestions(
        settings.topic,
        settings.difficulty,
        settings.questionCount
      );
      setQuestions(generatedQuestions);
      setStatus(AppStatus.QUIZ);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate quiz. Please try a different topic or try again later.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleQuizComplete = (results: { questionIndex: number; selectedAnswer: string; isCorrect: boolean }[]) => {
    setHistory(results);
    setStatus(AppStatus.RESULTS);
  };

  const handleRestart = () => {
    setQuestions([]);
    setHistory([]);
    setStatus(AppStatus.IDLE);
  };

  const calculateScore = () => {
    return history.filter(h => h.isCorrect).length;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col items-center py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Pattern Background */}
      <div className="fixed inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="w-full max-w-3xl z-10">
        <AnimatePresence mode="wait">
          {status === AppStatus.IDLE && (
            <StartScreen key="start" onStart={handleStart} />
          )}

          {status === AppStatus.LOADING && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <LoadingScreen />
            </motion.div>
          )}

          {status === AppStatus.QUIZ && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizScreen questions={questions} onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {status === AppStatus.RESULTS && (
            <ResultScreen 
              key="results"
              score={calculateScore()}
              total={questions.length}
              history={history}
              questions={questions}
              onRestart={handleRestart}
            />
          )}

          {status === AppStatus.ERROR && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md mx-auto bg-slate-800 p-8 rounded-2xl border border-red-900/50 shadow-xl"
            >
              <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-400 w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Something went wrong</h2>
              <p className="text-slate-400 text-sm mb-6">{errorMsg}</p>
              <button
                onClick={() => setStatus(AppStatus.IDLE)}
                className="bg-white text-slate-900 hover:bg-slate-200 font-medium py-2.5 px-6 rounded-lg transition-colors text-sm"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-auto pt-8 text-center text-slate-600 text-xs z-10">
        <p>Powered by Gemini 2.5 Flash</p>
      </div>
    </div>
  );
};

export default App;