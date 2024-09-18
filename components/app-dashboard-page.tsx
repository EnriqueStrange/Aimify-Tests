'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Brain, Mic, Book, User, LogOut } from 'lucide-react'
import Link from 'next/link'

const TestOption = ({ icon, title, description, color, onClick }) => (
  <motion.div
    className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer ${color} transform transition-all duration-300 hover:scale-105`}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <Icon className="text-gray-400 w-12 h-12 mb-4" />
    <h3 className="text-gray-600 text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

export function AppDashboardPage() {
  const [selectedTest, setSelectedTest] = useState(null)

  const handleTestSelect = (test) => {
    setSelectedTest(test)
    // Here you would typically navigate to the selected test
    console.log(`Selected test: ${test}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <nav className="flex justify-between items-center mb-8">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">Amify</span>
        </Link>
        <div className="flex items-center space-x-4">
          <User className="h-6 w-6 text-gray-600" />
          <span className="text-gray-600">John Doe</span>
          <Link href="/login">
            <Button variant="outline" className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </Link>
        </div>
      </nav>

      <main>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-gray-800"
        >
          Choose Your Adventure!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <TestOption
            icon={Book}
            title="Foundation Test"
            description="Build your knowledge base with core concepts"
            color="hover:bg-blue-50"
            onClick={() => handleTestSelect('Foundation')}
          />
          <TestOption
            icon={Mic}
            title="Speech Test"
            description="Enhance your communication skills"
            color="hover:bg-green-50"
            onClick={() => handleTestSelect('Speech')}
          />
          <TestOption
            icon={Brain}
            title="Personality Test"
            description="Discover your unique traits and strengths"
            color="hover:bg-purple-50"
            onClick={() => handleTestSelect('Personality')}
          />
        </motion.div>

        {selectedTest && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-12 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to start your {selectedTest} Test?</h2>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105">
              Begin Test
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  )
}
