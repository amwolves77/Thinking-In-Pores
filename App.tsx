
import React, { useState, useEffect, useRef } from 'react';
import { GameState, LeaderboardEntry } from './types';
import { QUESTIONS } from './constants';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('LOGIN');
  const [username, setUsername] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  
  // Timer states
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerIntervalRef = useRef<number | null>(null);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard on mount
  useEffect(() => {
    const saved = localStorage.getItem('blunt_coach_leaderboard');
    if (saved) {
      try {
        setLeaderboard(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse leaderboard", e);
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (gameState === 'PLAYING' && !isLocked) {
      if (!timerIntervalRef.current) {
        timerIntervalRef.current = window.setInterval(() => {
          setElapsedSeconds(prev => prev + 1);
        }, 1000);
      }
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, isLocked]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setGameState('LANDING');
    }
  };

  const startGame = () => {
    setGameState('PLAYING');
    setCurrentIndex(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setIsLocked(false);
    setElapsedSeconds(0);
    setStartTime(Date.now());
  };

  const handleSelect = (option: 'A' | 'B' | 'C') => {
    if (isLocked) return;
    
    setSelectedOption(option);
    setIsLocked(true);
    
    if (option === QUESTIONS[currentIndex].incorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsLocked(false);
    } else {
      finishGame();
    }
  };

  const calculateFinalScore = (c: number, t: number) => {
    // Score = [10C + (100 - T)/2]
    const raw = (10 * c) + ((100 - t) / 2);
    return Math.max(0, Math.round(raw)); // Prevent negative scores and round
  };

  const finishGame = () => {
    const finalScore = calculateFinalScore(correctCount, elapsedSeconds);
    const newEntry: LeaderboardEntry = {
      username,
      score: finalScore,
      time: elapsedSeconds,
      date: new Date().toLocaleDateString()
    };
    
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('blunt_coach_leaderboard', JSON.stringify(updatedLeaderboard));
    setGameState('FINISHED');
  };

  const getDifficultyColor = (label: string) => {
    switch(label) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Intermediate': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Advanced': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (gameState === 'LOGIN') {
    return (
      <Layout>
        <div className="text-center space-y-8 py-4">
          <header>
            <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-br from-slate-900 to-indigo-700 bg-clip-text text-transparent">
              Thinking in Pores
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Subsurface Engineering Academy</p>
          </header>
          
          <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Engineer ID / Username</label>
              <input
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-semibold text-slate-800"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-slate-200"
            >
              Access Module
            </button>
          </form>
        </div>
      </Layout>
    );
  }

  if (gameState === 'LANDING') {
    return (
      <Layout>
        <div className="text-center space-y-8 py-4">
          <header>
            <div className="text-xs font-bold text-indigo-500 mb-2">Welcome back, {username}</div>
            <h1 className="text-5xl font-black tracking-tight mb-2 bg-gradient-to-br from-slate-900 to-indigo-700 bg-clip-text text-transparent">
              Thinking in Pores
            </h1>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold uppercase tracking-widest border border-indigo-100">
              Two Truths and a Lie
            </div>
          </header>
          <div className="py-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100 to-transparent h-px top-0" />
            <p className="text-slate-600 leading-relaxed text-lg max-w-md mx-auto">
              Test your intuition on subsurface flow. Each round contains two correct statements and one subtle misconception.
              <br/><br/>
              <span className="text-sm font-bold text-slate-400 italic block mt-2 underline decoration-indigo-200">Timer starts upon launching Question 1.</span>
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100 to-transparent h-px bottom-0" />
          </div>
          <button
            onClick={startGame}
            className="group relative w-full md:w-auto px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-slate-200 hover:shadow-indigo-200"
          >
            Start Learning Session
          </button>
        </div>
      </Layout>
    );
  }

  if (gameState === 'FINISHED') {
    const finalScore = calculateFinalScore(correctCount, elapsedSeconds);
    let message = "";
    if (correctCount >= 8) message = "Strong intuition";
    else if (correctCount >= 5) message = "Good foundation, some traps remain";
    else message = "Revisit fundamentals";

    return (
      <Layout>
        <div className="text-center space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Analysis Complete</h2>
            <p className="text-slate-400 uppercase font-bold tracking-widest text-xs">Misconception Detection Report</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative inline-flex items-center justify-center p-1 rounded-full bg-slate-50 border-4 border-white shadow-inner">
               <div className="w-32 h-32 flex flex-col items-center justify-center rounded-full bg-white shadow-lg border border-slate-100">
                  <span className="text-4xl font-black text-slate-900">{finalScore}</span>
                  <span className="text-slate-400 font-bold text-[10px] tracking-widest uppercase">Score</span>
               </div>
            </div>
            <div className="text-left space-y-1">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Performance Data</div>
              <div className="text-slate-700">Correct Lies Spotted: <span className="font-bold">{correctCount}/10</span></div>
              <div className="text-slate-700">Total Time Taken: <span className="font-bold">{elapsedSeconds}s</span></div>
              
            </div>
          </div>

          <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
            <p className="text-indigo-600 font-medium italic">“{message}”</p>
          </div>

          

          <button
            onClick={startGame}
            className="w-full md:w-auto px-12 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-indigo-100"
          >
            Run Another Session
          </button>
        </div>
      </Layout>
    );
  }

  const currentQ = QUESTIONS[currentIndex];

  return (
    <Layout>
      <div className="space-y-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 w-fit">
                Round {currentIndex + 1} of 10
              </span>
              <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {elapsedSeconds}s elapsed
              </div>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${getDifficultyColor(currentQ.difficultyLabel)}`}>
              <span>{currentQ.difficultyIcon}</span>
              <span className="uppercase tracking-wider">{currentQ.difficultyLabel}</span>
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-800 leading-tight">
            {currentQ.topic}
          </h3>
        </header>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px flex-1 bg-slate-100"></div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Identify the Fallacy</p>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>
          
          <div className="space-y-3">
            {(['A', 'B', 'C'] as const).map((key) => {
              const isSelected = selectedOption === key;
              const isCorrectLie = key === currentQ.incorrect;
              
              let cardStyles = "group relative w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ";
              
              if (!isLocked) {
                cardStyles += "bg-white border-slate-100 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-50 hover:-translate-y-0.5 cursor-pointer";
              } else {
                if (isCorrectLie) {
                  cardStyles += "border-emerald-500 bg-emerald-50/50 text-emerald-900 shadow-lg shadow-emerald-50";
                } else if (isSelected && !isCorrectLie) {
                  cardStyles += "border-rose-500 bg-rose-50/50 text-rose-900 shadow-lg shadow-rose-50";
                } else {
                  cardStyles += "border-slate-100 opacity-40 bg-slate-50";
                }
              }

              return (
                <button
                  key={key}
                  disabled={isLocked}
                  onClick={() => handleSelect(key)}
                  className={cardStyles}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-colors duration-300
                      ${!isLocked ? 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600' : 
                        isCorrectLie ? 'bg-emerald-500 text-white' : 
                        isSelected ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'}
                    `}>
                      {key}
                    </div>
                    <span className="text-slate-700 font-semibold leading-relaxed pt-0.5">{currentQ.statements[key]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {isLocked && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold border-2 ${selectedOption === currentQ.incorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
              <div className={`p-1 rounded-full ${selectedOption === currentQ.incorrect ? 'bg-emerald-200' : 'bg-rose-200'}`}>
                {selectedOption === currentQ.incorrect ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                )}
              </div>
              <span className="text-sm tracking-tight">{selectedOption === currentQ.incorrect ? 'Well done! You spotted the lie.' : 'The lie was actually Statement ' + currentQ.incorrect + '.'}</span>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1 w-6 bg-indigo-500 rounded-full"></div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Technical Briefing</h4>
                </div>
                <p className="leading-relaxed text-sm technical-font font-medium text-slate-300">{currentQ.explanation}</p>
              </div>
            </div>

            <button
              onClick={nextQuestion}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <span className="tracking-wide">{currentIndex < QUESTIONS.length - 1 ? 'Next Challenge' : 'Final Results'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
