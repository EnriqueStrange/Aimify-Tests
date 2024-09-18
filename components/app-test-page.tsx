'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, ChevronRight, RotateCcw } from 'lucide-react'

const questions = [
  { id: 1, text: "What is the capital of France?", answer: "Paris" },
  { id: 2, text: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { id: 3, text: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { id: 4, text: "In which year did World War II end?", answer: "1945" },
  { id: 5, text: "What is the chemical symbol for gold?", answer: "Au" },
]

const generateRandomPosition = () => {
  return {
    left: `${Math.random() * 40 + 30}%`, // 30% to 70%
  }
}

export function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completedQuestions, setCompletedQuestions] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [starPositions, setStarPositions] = useState(questions.map(() => generateRandomPosition()))
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correct = userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()
    setIsCorrect(correct)
    setShowFeedback(true)
    if (correct) {
      setCompletedQuestions(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    setIsAnimating(true)
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        setQuizCompleted(true)
      } else {
        setCurrentQuestionIndex(prev => prev + 1)
        setUserAnswer('')
        setShowFeedback(false)
        setIsAnimating(false)
      }
    }, 1000)
  }

  useEffect(() => {
    if (showFeedback && isCorrect) {
      const timer = setTimeout(nextQuestion, 2000)
      return () => clearTimeout(timer)
    }
  }, [showFeedback, isCorrect])

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswer('')
    setShowFeedback(false)
    setIsCorrect(false)
    setCompletedQuestions(0)
    setIsAnimating(false)
    setQuizCompleted(false)
    setStarPositions(questions.map(() => generateRandomPosition()))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8 relative overflow-hidden">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">Star Quest Challenge</h1>
      
      <div className="flex flex-col space-y-24">
        {questions.map((question, index) => (
          <div key={question.id} className="flex items-start relative" style={{ height: '120px' }}>
            <motion.div 
              className={`absolute ${index <= completedQuestions ? 'text-yellow-500' : 'text-gray-400'}`}
              style={{ ...starPositions[index], transition: 'color 0.5s ease' }}
              animate={quizCompleted ? { 
                x: 'calc(50vw - 50%)', 
                y: 'calc(50vh - 50%)', 
                scale: [1, 1.2, 1],
                transition: { duration: 1, delay: index * 0.2 } 
              } : {}}
            >
              <Star className="h-12 w-12" />
              {isAnimating && index === currentQuestionIndex && !quizCompleted && (
                <motion.div
                  initial={{ scale: 1, x: 0, y: 0 }}
                  animate={{ scale: 0, x: 0, y: '100%' }}
                  exit={{ scale: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 left-0 bg-indigo-500 rounded-full h-4 w-4"
                />
              )}
            </motion.div>
            
            <AnimatePresence mode="wait">
              {index === currentQuestionIndex && !quizCompleted && (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bg-white rounded-xl shadow-lg p-6"
                  style={{ 
                    left: `calc(${starPositions[index].left} + 60px)`,
                    width: '30%',
                    maxWidth: '400px'
                  }}
                >
                  <h2 className="text-xl font-semibold mb-4 text-indigo-800">{question.text}</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here"
                      className="w-full p-3 border rounded-lg"
                      disabled={showFeedback}
                    />
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center"
                      disabled={showFeedback}
                    >
                      Submit Answer
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                  {showFeedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {isCorrect ? 
                        'Correct! Great job!' : 
                        `Oops! The correct answer is: ${question.answer}`
                      }
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Completion animation */}
      <AnimatePresence>
        {quizCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: questions.length * 0.2 + 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: questions.length * 0.2 + 1 }}
              className="text-6xl font-bold text-indigo-800 mb-8"
            >
              Good!
            </motion.h2>
            <Button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Play Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      {!quizCompleted && (
        <div className="mt-8 text-center text-indigo-800">
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          <div className="flex justify-center mt-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 mx-1 rounded-full ${
                  index <= currentQuestionIndex ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}