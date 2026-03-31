import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, RotateCw, Trophy, Clock } from 'lucide-react';

const PRACTICE_SIGNS = [
  { sign: 'A', emoji: '✊' },
  { sign: 'B', emoji: '🖐️' },
  { sign: 'C', emoji: '👌' },
  { sign: 'Hello', emoji: '👋' },
  { sign: 'Thank You', emoji: '🙏' },
  { sign: 'Please', emoji: '🤲' },
  { sign: 'Yes', emoji: '👊' },
  { sign: 'No', emoji: '🤚' },
];

export function PracticeMode() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);

  const currentSign = PRACTICE_SIGNS[currentIndex];
  const progress = ((currentIndex + 1) / PRACTICE_SIGNS.length) * 100;

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSkip();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, currentIndex]);

  const handleAttempt = (isCorrect: boolean) => {
    setIsProcessing(true);
    setShowResult(isCorrect ? 'correct' : 'incorrect');
    setAttempts(attempts + 1);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowResult(null);
      setIsProcessing(false);
      if (currentIndex < PRACTICE_SIGNS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTimeLeft(10);
      } else {
        setIsActive(false);
      }
    }, 1500);
  };

  const handleSkip = () => {
    if (currentIndex < PRACTICE_SIGNS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAttempts(attempts + 1);
      setTimeLeft(10);
    } else {
      setIsActive(false);
    }
  };

  const startPractice = () => {
    setIsActive(true);
    setCurrentIndex(0);
    setScore(0);
    setAttempts(0);
    setTimeLeft(10);
  };

  const resetPractice = () => {
    setIsActive(false);
    setCurrentIndex(0);
    setScore(0);
    setAttempts(0);
    setShowResult(null);
    setTimeLeft(10);
  };

  if (!isActive) {
    return (
      <div className="space-y-6">
        {attempts > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 text-center">
              <Trophy className="size-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-3xl font-bold mb-2">Practice Complete!</h2>
              <div className="text-6xl font-bold text-green-600 mb-4">
                {score}/{attempts}
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Accuracy: {Math.round((score / attempts) * 100)}%
              </p>
              <Button onClick={startPractice} size="lg" className="gap-2">
                <RotateCw className="size-4" />
                Practice Again
              </Button>
            </Card>
          </motion.div>
        )}

        {attempts === 0 && (
          <Card className="p-8 text-center">
            <div className="text-6xl mb-6">🤟</div>
            <h2 className="text-2xl font-bold mb-2">Ready to Practice?</h2>
            <p className="text-gray-600 mb-6">
              Test your sign language skills! You'll be shown signs to recognize
              within a time limit. Try to get them all correct!
            </p>
            <Button onClick={startPractice} size="lg">
              Start Practice
            </Button>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">Best Streak</div>
            <div className="text-3xl font-bold">12</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">Total Practices</div>
            <div className="text-3xl font-bold">47</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">Average Accuracy</div>
            <div className="text-3xl font-bold text-green-600">89%</div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Question {currentIndex + 1}/{PRACTICE_SIGNS.length}
          </Badge>
          <Badge className="text-lg px-4 py-2 gap-2">
            <Clock className="size-4" />
            {timeLeft}s
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Score</div>
          <div className="text-2xl font-bold">{score}/{attempts}</div>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-12 relative overflow-hidden">
            {showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute inset-0 flex items-center justify-center ${
                  showResult === 'correct' ? 'bg-green-500' : 'bg-red-500'
                } bg-opacity-20 backdrop-blur-sm z-10`}
              >
                {showResult === 'correct' ? (
                  <Check className="size-32 text-green-600" />
                ) : (
                  <X className="size-32 text-red-600" />
                )}
              </motion.div>
            )}

            <div className="text-center">
              <h3 className="text-xl text-gray-600 mb-6">
                Show the sign for:
              </h3>
              <div className="text-8xl mb-8">{currentSign.emoji}</div>
              <div className="text-5xl font-bold mb-8">{currentSign.sign}</div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4">
        <Button
          onClick={() => handleAttempt(true)}
          disabled={isProcessing}
          size="lg"
          className="flex-1 gap-2"
        >
          <Check className="size-5" />
          Correct
        </Button>
        <Button
          onClick={() => handleAttempt(false)}
          disabled={isProcessing}
          variant="outline"
          size="lg"
          className="flex-1 gap-2"
        >
          <X className="size-5" />
          Incorrect
        </Button>
        <Button
          onClick={handleSkip}
          disabled={isProcessing}
          variant="secondary"
          size="lg"
          className="gap-2"
        >
          Skip
        </Button>
      </div>

      <Button
        onClick={resetPractice}
        variant="ghost"
        className="w-full gap-2"
      >
        <RotateCw className="size-4" />
        Reset Practice
      </Button>
    </div>
  );
}
