import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle, RefreshCw, Share2, Leaf, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

interface Score {
  total: number;
  date: string;
  rating: string;
}

export default function EcoScorePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [savedScore, setSavedScore] = useState<Score | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: 'How often do you use reusable bags for shopping?',
      options: [
        { text: 'Always', score: 5 },
        { text: 'Most of the time', score: 4 },
        { text: 'Sometimes', score: 3 },
        { text: 'Rarely', score: 2 },
        { text: 'Never', score: 1 },
      ],
    },
    {
      id: 2,
      question: 'What is your primary mode of transportation?',
      options: [
        { text: 'Public transport or bicycle', score: 5 },
        { text: 'Carpool regularly', score: 4 },
        { text: 'Personal car with efficient route planning', score: 3 },
        { text: 'Personal car for most trips', score: 2 },
        { text: 'Multiple personal vehicles', score: 1 },
      ],
    },
    {
      id: 3,
      question: 'How do you manage your household waste?',
      options: [
        { text: 'Actively recycle and compost', score: 5 },
        { text: 'Regularly recycle major items', score: 4 },
        { text: 'Occasionally recycle', score: 3 },
        { text: 'Rarely recycle', score: 2 },
        { text: 'Do not recycle', score: 1 },
      ],
    },
    {
      id: 4,
      question: 'How conscious are you about energy consumption at home?',
      options: [
        { text: 'Very conscious - use energy-efficient appliances and monitor usage', score: 5 },
        { text: 'Conscious - turn off lights and optimize AC usage', score: 4 },
        { text: 'Somewhat conscious - try to save when I remember', score: 3 },
        { text: 'Not very conscious', score: 2 },
        { text: 'Not conscious at all', score: 1 },
      ],
    },
    {
      id: 5,
      question: 'How often do you choose sustainable or eco-friendly products?',
      options: [
        { text: 'Always - I actively seek eco-friendly options', score: 5 },
        { text: 'Often - when available and affordable', score: 4 },
        { text: 'Sometimes - if convenient', score: 3 },
        { text: 'Rarely - price is my priority', score: 2 },
        { text: 'Never - I don\'t consider it', score: 1 },
      ],
    },
  ];

  useEffect(() => {
    // Load saved score from localStorage
    const saved = localStorage.getItem('ecoScore');
    if (saved) {
      setSavedScore(JSON.parse(saved));
    }
  }, []);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const total = answers.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 5;
    const percentage = (total / maxScore) * 100;

    let rating = '';
    let advice = '';

    if (percentage >= 80) {
      rating = 'Eco Champion 🌟';
      advice = 'Outstanding! You\'re making a significant positive impact on the environment. Keep up the excellent work and inspire others!';
    } else if (percentage >= 60) {
      rating = 'Green Advocate 🌿';
      advice = 'Great job! You\'re on the right track with eco-friendly habits. Look for more opportunities to enhance your sustainable practices.';
    } else if (percentage >= 40) {
      rating = 'Eco Explorer 🌱';
      advice = 'Good start! You have room to grow. Focus on incorporating more sustainable choices into your daily routine.';
    } else if (percentage >= 20) {
      rating = 'Eco Beginner 🌾';
      advice = 'There\'s potential! Small changes can make a big difference. Start with simple habits like using reusable bags and recycling.';
    } else {
      rating = 'Eco Starter 🌍';
      advice = 'Everyone starts somewhere! Begin your eco-journey with simple steps. Every small action counts toward a greener future.';
    }

    const score: Score = {
      total: Math.round(percentage),
      date: new Date().toLocaleDateString(),
      rating,
    };

    // Save to localStorage
    localStorage.setItem('ecoScore', JSON.stringify(score));
    setSavedScore(score);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-lime-600';
    if (score >= 40) return 'text-yellow-600';
    if (score >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-600';
    if (score >= 60) return 'from-lime-400 to-lime-600';
    if (score >= 40) return 'from-yellow-400 to-yellow-600';
    if (score >= 20) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-green-800">Eco Score Quiz</h1>
        </div>
        <p className="text-green-600">
          Answer 5 questions to discover your environmental impact score and get personalized recommendations.
        </p>
      </motion.div>

      {/* Previous Score Card */}
      {savedScore && !showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-green-100 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 mb-1">Your Last Score</p>
                  <p className={`${getScoreColor(savedScore.total)} mb-1`}>
                    {savedScore.total}% - {savedScore.rating}
                  </p>
                  <p className="text-green-500">Taken on {savedScore.date}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-green-100 shadow-lg">
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-800">
                      Question {currentQuestion + 1} of {questions.length}
                    </CardTitle>
                    <span className="text-green-600">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-green-800">{questions[currentQuestion].question}</h2>

                  <RadioGroup
                    value={answers[currentQuestion]?.toString()}
                    onValueChange={(value) => handleAnswer(parseInt(value))}
                  >
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center space-x-3 p-4 rounded-lg border border-green-100 hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer">
                            <RadioGroupItem value={option.score.toString()} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-green-700">
                              {option.text}
                            </Label>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className="flex justify-between pt-4">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      variant="outline"
                      className="border-green-500 text-green-700 hover:bg-green-50"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={answers[currentQuestion] === undefined}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="border-green-100 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  {/* Score Display */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <div className={`w-32 h-32 mx-auto bg-gradient-to-br ${getScoreBg(savedScore!.total)} rounded-full flex items-center justify-center mb-4`}>
                      <div className="text-white">
                        <div className="mb-1">{savedScore!.total}%</div>
                        <Award className="w-8 h-8 mx-auto" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-green-800 mb-2">{savedScore!.rating}</h2>
                    <p className="text-green-600 max-w-lg mx-auto">
                      {savedScore!.total >= 80
                        ? 'Outstanding! You\'re making a significant positive impact on the environment. Keep up the excellent work and inspire others!'
                        : savedScore!.total >= 60
                        ? 'Great job! You\'re on the right track with eco-friendly habits. Look for more opportunities to enhance your sustainable practices.'
                        : savedScore!.total >= 40
                        ? 'Good start! You have room to grow. Focus on incorporating more sustainable choices into your daily routine.'
                        : savedScore!.total >= 20
                        ? 'There\'s potential! Small changes can make a big difference. Start with simple habits like using reusable bags and recycling.'
                        : 'Everyone starts somewhere! Begin your eco-journey with simple steps. Every small action counts toward a greener future.'}
                    </p>
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
                  >
                    <Card className="border-green-100">
                      <CardContent className="p-4 text-center">
                        <Leaf className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-green-700">Start composting</p>
                      </CardContent>
                    </Card>
                    <Card className="border-green-100">
                      <CardContent className="p-4 text-center">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-green-700">Use public transport</p>
                      </CardContent>
                    </Card>
                    <Card className="border-green-100">
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-green-700">Reduce energy use</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap gap-4 justify-center pt-6"
                  >
                    <Button
                      onClick={resetQuiz}
                      className="bg-green-500 hover:bg-green-600 text-white gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retake Quiz
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-700 hover:bg-green-50 gap-2"
                      onClick={() => {
                        alert('Share functionality coming soon!');
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                      Share Results
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
