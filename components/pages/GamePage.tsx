'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Confetti, Celebration } from '@/components/ui/Confetti';
import { Pause, Play, Lightbulb, ArrowLeft } from 'lucide-react';
import { getQuestionsFromBank, clearSeenQuestions } from '@/lib/questionBankLoader';
import { getQuestionsCount } from '@/lib/levelConfig';

export const GamePage: React.FC<{ levelId: string }> = ({ levelId }) => {
  const router = useRouter();
  const {
    currentLevel,
    currentQuestion,
    currentGameState,
    startGame,
    answerQuestion,
    nextQuestion,
    pauseGame,
    resumeGame,
    resetGame,
    useHint,
    updateProgress,
    completeLevel,
    setShowConfetti,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 追踪当前年级和难度，用于判断是否需要清空seenQuestions
  const [currentGrade, setCurrentGrade] = useState<number | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<string | null>(null);

  useEffect(() => {
    // 解析关卡ID获取信息
    // levelId 格式: grade1-basic-1, grade1-basic-2, grade1-basic-3
    const parts = levelId.split('-');
    const gradeNum = parseInt(parts[0].replace('grade', ''));
    const difficultyStr = parts[1];
    const levelNum = parseInt(parts[2]);

    // 如果年级或难度变化，清空对应的seenQuestions
    if (currentGrade !== null && currentDifficulty !== null) {
      if (currentGrade !== gradeNum || currentDifficulty !== difficultyStr) {
        // 切换了年级或难度，清空之前的seenQuestions
        clearSeenQuestions(currentGrade as any, currentDifficulty as any);
      }
    }

    // 更新当前年级和难度
    setCurrentGrade(gradeNum);
    setCurrentDifficulty(difficultyStr);

    // 如果是第1关，清空当前年级难度的seenQuestions
    if (levelNum === 1) {
      clearSeenQuestions(gradeNum as any, difficultyStr as any);
    }

    // 从题库加载题目（异步）
    const loadLevel = async () => {
      setIsLoading(true);

      try {
        const questions = await getQuestionsFromBank(
          gradeNum as any,
          difficultyStr as any,
          levelNum,
          levelId
        );

        // 检查是否成功加载题目
        if (!questions || questions.length === 0) {
          console.error('No questions loaded for', levelId);
          setIsLoading(false);
          return;
        }

        const questionsCount = getQuestionsCount(gradeNum as any);
        const timeLimit = questionsCount * 30; // 每题30秒

        const level = {
          id: levelId,
          grade: gradeNum as any,
          difficulty: difficultyStr as any,
          levelNumber: levelNum,
          title: `第${levelNum}关`,
          description: '完成所有题目获得星星',
          questions,
          totalStars: 3,
          earnedStars: 0,
          status: 'unlocked' as any,
          requiredScore: 60,
          timeLimit,
        };

        startGame(level);
        setTimeLeft(timeLimit);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load level:', error);
        setIsLoading(false);
      }
    };

    loadLevel();

    return () => {
      resetGame();
    };
  }, [levelId]);

  // 计时器
  useEffect(() => {
    if (!currentGameState?.isPaused && timeLeft > 0 && currentQuestion) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // 时间到，自动进入下一题
            handleAnswer(-1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, currentGameState?.isPaused, currentQuestion]);

  if (isLoading || !currentLevel || !currentQuestion || !currentGameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎮</div>
          <div className="text-3xl font-bold text-gray-600">加载中...</div>
          <div className="text-lg text-gray-500 mt-2">正在准备题目...</div>
        </div>
      </div>
    );
  }

  const totalQuestions = currentLevel.questions.length;
  const currentProgress = ((currentGameState.currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswer = (answer: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);

    // 确保答案比较时类型一致（将currentQuestion.answer转换为数字）
    const correctAnswer = typeof currentQuestion.answer === 'string'
      ? parseInt(currentQuestion.answer as string, 10)
      : currentQuestion.answer;

    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    answerQuestion(currentQuestion.id, answer, correct);

    setTimeout(() => {
      if (correct) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }

      if (currentGameState.currentQuestionIndex >= totalQuestions - 1) {
        // 游戏结束 - 保存最终分数到进度
        const finalScore = currentGameState.score + (correct ? 10 : 0);
        const stars = calculateStars(finalScore, totalQuestions);
        completeLevel(levelId, stars, finalScore);

        // 保存游戏状态到 sessionStorage 以便在完成页面使用
        const gameStateToSave = {
          ...currentGameState,
          score: finalScore,
          correctAnswers: currentGameState.correctAnswers + (correct ? 1 : 0),
          wrongAnswers: currentGameState.wrongAnswers + (correct ? 0 : 1),
        };
        sessionStorage.setItem('lastGameResult', JSON.stringify(gameStateToSave));

        router.push('/complete');
      } else {
        nextQuestion();
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowHint(false);
      }
    }, 1500);
  };

  const calculateStars = (score: number, total: number): number => {
    const percentage = (score / (total * 10)) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 60) return 1;
    return 0;
  };

  const handlePause = () => {
    if (currentGameState.isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  };

  const handleShowHint = () => {
    if (currentQuestion.hint && !showHint) {
      setShowHint(true);
      useHint();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Celebration trigger={isCorrect && showFeedback} />
      <Confetti trigger={isCorrect && showFeedback} />

      <div className="max-w-4xl mx-auto">
        {/* 顶部信息栏 */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} className="mr-2" />
            退出
          </Button>

          <div className="flex items-center gap-4">
            <div className="px-6 py-3 bg-white rounded-full shadow-lg">
              <span className="text-2xl font-bold text-purple-600">
                ⭐ {currentGameState.score}
              </span>
            </div>

            <div className="px-6 py-3 bg-white rounded-full shadow-lg">
              <span className="text-2xl font-bold text-orange-500">
                🔥 {currentGameState.streak}
              </span>
            </div>

            <div className="px-6 py-3 bg-white rounded-full shadow-lg">
              <span className="text-2xl font-bold text-blue-600">
                ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={handlePause}
            >
              {currentGameState.isPaused ? <Play size={20} /> : <Pause size={20} />}
            </Button>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-8">
          <ProgressBar
            progress={currentProgress}
            current={currentGameState.currentQuestionIndex + 1}
            total={totalQuestions}
            showLabel
            color="purple"
            size="lg"
          />
        </div>

        {/* 题目区域 */}
        <AnimatePresence mode="wait">
          {!currentGameState.isPaused && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* 问题卡片 */}
              <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8">
                <div className="question-text funny-font">
                  {currentQuestion.question}
                </div>

                {showHint && currentQuestion.hint && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl"
                  >
                    <p className="text-lg text-yellow-800 font-medium">
                      💡 提示：{currentQuestion.hint}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* 选项区域 */}
              {currentQuestion.options && (
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isAnswerCorrect = option === currentQuestion.answer;
                    const showCorrect = showFeedback && isAnswerCorrect;
                    const showWrong = showFeedback && isSelected && !isCorrect;

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={showFeedback}
                        whileHover={{ scale: showFeedback ? 1 : 1.05 }}
                        whileTap={{ scale: showFeedback ? 1 : 0.95 }}
                        className={`answer-option ${
                          showCorrect
                            ? 'bg-green-500 text-white'
                            : showWrong
                            ? 'bg-red-500 text-white'
                            : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
                        } ${
                          showFeedback && !showCorrect && !showWrong
                            ? 'opacity-50'
                            : ''
                        }`}
                      >
                        <span className="text-4xl font-bold">{option}</span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* 提示按钮 */}
              {currentQuestion.hint && !showHint && (
                <div className="text-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleShowHint}
                  >
                    <Lightbulb size={24} className="mr-2" />
                    获取提示
                  </Button>
                </div>
              )}

              {/* 反馈信息 */}
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-12 py-8 rounded-3xl shadow-2xl ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  } text-white`}
                >
                  <div className="text-6xl mb-4">
                    {isCorrect ? '🎉' : '😅'}
                  </div>
                  <div className="text-4xl font-bold funny-font">
                    {isCorrect ? '太棒了！' : '继续加油！'}
                  </div>
                  {isCorrect && (
                    <div className="text-2xl mt-2 font-bold">
                      +{10 + currentGameState.streak * 2} 分
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 暂停遮罩 */}
        {currentGameState.isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="text-6xl mb-6">⏸️</div>
              <h2 className="text-4xl font-bold mb-8 funny-font">游戏暂停</h2>
              <Button
                variant="primary"
                size="xl"
                onClick={handlePause}
              >
                继续游戏
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
