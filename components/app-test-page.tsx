'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Send, Star, RotateCcw } from 'lucide-react'

const questions = [
  { id: 1, text: "What is the capital of France?", answer: "Paris" },
  { id: 2, text: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { id: 3, text: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { id: 4, text: "In which year did World War II end?", answer: "1945" },
  { id: 5, text: "What is the chemical symbol for gold?", answer: "Au" },
]

export function AppTestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''))
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(Array(questions.length).fill(false))
  const scrollContainerRef = useRef(null)

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = direction === 'right' ? container.offsetWidth : -container.offsetWidth
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleSubmit = (e, index) => {
    e.preventDefault()
    const isCorrect = userAnswers[index].toLowerCase() === questions[index].answer.toLowerCase()
    if (isCorrect && !showFeedback[index]) {
      setScore(prevScore => prevScore + 1)
    }
    setShowFeedback(prev => {
      const newFeedback = [...prev]
      newFeedback[index] = true
      return newFeedback
    })
  }

  const handleInputChange = (e, index) => {
    const newAnswers = [...userAnswers]
    newAnswers[index] = e.target.value
    setUserAnswers(newAnswers)
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers(Array(questions.length).fill(''))
    setScore(0)
    setShowFeedback(Array(questions.length).fill(false))
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollLeft
        const cardWidth = scrollContainerRef.current.offsetWidth
        const newIndex = Math.round(scrollPosition / cardWidth)
        setCurrentQuestionIndex(newIndex)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-indigo-800">Amify Quiz Adventure</h1>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-semibold">{score}</span>
          </div>
          <Progress value={(currentQuestionIndex + 1) / questions.length * 100} className="w-1/2" />
          <div className="text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {questions.map((question, index) => (
            <div 
              key={question.id} 
              className="w-full flex-shrink-0 snap-center"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8 m-4"
              >
                <h2 className="text-2xl font-semibold mb-6 text-center">{question.text}</h2>
                <form onSubmit={(e) => handleSubmit(e, index)} className="space-y-4">
                  <Input
                    type="text"
                    value={userAnswers[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Type your answer here"
                    className="w-full p-3 border rounded-lg"
                    disabled={showFeedback[index]}
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center"
                    disabled={showFeedback[index]}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Submit Answer
                  </Button>
                </form>
                {showFeedback[index] && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-lg ${userAnswers[index].toLowerCase() === question.answer.toLowerCase() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {userAnswers[index].toLowerCase() === question.answer.toLowerCase() ? 
                      'Correct! Great job!' : 
                      `Oops! The correct answer is: ${question.answer}`
                    }
                  </motion.div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={() => handleScroll('left')} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-indigo-600 rounded-full p-2 shadow-lg"
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          onClick={() => handleScroll('right')} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-indigo-600 rounded-full p-2 shadow-lg"
          disabled={currentQuestionIndex === questions.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </main>

      <div className="mt-8 text-center">
        <Button
          onClick={resetQuiz}
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset Quiz
        </Button>
      </div>
    </div>
  )
}