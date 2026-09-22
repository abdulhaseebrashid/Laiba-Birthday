import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import WelcomeScreen  from './components/WelcomeScreen';
import BirthdayIntro  from './components/BirthdayIntro';
import QuestionScreen from './components/QuestionScreen';
import FinalSurprise  from './components/FinalSurprise';
import { questions }  from './data/questions';

const SCREENS = { WELCOME: 'welcome', BIRTHDAY: 'birthday', QUESTIONS: 'questions', FINAL: 'final' };

// ─── Cinematic page transition ────────────────────────────────────────────
function PageTransition({ children, screenKey }) {
  return (
    <motion.div
      key={screenKey}
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{    opacity: 0, scale: 0.97, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,        setScreen]        = useState(SCREENS.WELCOME);
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleAnswer = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((p) => p + 1);
    } else {
      setScreen(SCREENS.FINAL);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === SCREENS.WELCOME && (
          <PageTransition screenKey="welcome">
            <WelcomeScreen onStart={() => setScreen(SCREENS.BIRTHDAY)} />
          </PageTransition>
        )}

        {screen === SCREENS.BIRTHDAY && (
          <PageTransition screenKey="birthday">
            <BirthdayIntro onContinue={() => setScreen(SCREENS.QUESTIONS)} />
          </PageTransition>
        )}

        {screen === SCREENS.QUESTIONS && (
          <PageTransition screenKey={`q-${questionIndex}`}>
            <QuestionScreen
              question={questions[questionIndex]}
              questionIndex={questionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          </PageTransition>
        )}

        {screen === SCREENS.FINAL && (
          <PageTransition screenKey="final">
            <FinalSurprise />
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}
