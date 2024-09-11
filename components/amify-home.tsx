'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, GraduationCap, Users, BookOpen, Award, Facebook, Twitter, Instagram, Youtube, Globe, Zap, Star } from 'lucide-react'

interface AimifyHomeProps {
  onClick: () => void;
}

export function AimifyHome({ onClick }: AimifyHomeProps) {
  const [progress, setProgress] = useState(0)

  const incrementProgress = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 20, 100))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Brain className="h-10 w-10 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">Aimify</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Personality Tests</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Academic Tests</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Study Resources</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Progress Tracker</a>
          </nav>
          <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={onClick}>Start a Test</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Gen Z elements */}
        <section className="relative text-center mb-24 pt-12 overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Level Up Your Brain Power!
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Unlock your potential, ace your tests, and discover your true self with Aimify&apos;s epic personality and academic quests!
            </p>
            <Button onClick={incrementProgress} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg px-8 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105">
              Start Your Adventure
            </Button>
          </div>
          <div className="mt-8 max-w-md mx-auto relative z-10">
            <Progress value={progress} className="h-4 bg-blue-100">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </Progress>
            <p className="mt-2 text-sm text-gray-600">Brain Power: {progress}% Unlocked</p>
          </div>
          {/* Animated cartoon elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 left-10 animate-bounce">
              <Star className="h-12 w-12 text-yellow-400" />
            </div>
            <div className="absolute top-20 right-20 animate-pulse">
              <Zap className="h-16 w-16 text-blue-400" />
            </div>
            <div className="absolute bottom-10 left-1/4 animate-spin-slow">
              <Brain className="h-20 w-20 text-purple-400" />
            </div>
            <div className="absolute top-1/3 right-1/3 animate-float">
              <GraduationCap className="h-24 w-24 text-green-400" />
            </div>
          </div>
        </section>

        {/* Test Categories */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Explore Our Test Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Personality Insights', icon: Brain, color: 'bg-purple-100' },
              { name: 'Academic Aptitude', icon: GraduationCap, color: 'bg-blue-100' },
              { name: 'Career Compatibility', icon: Users, color: 'bg-green-100' },
              { name: 'Study Skills', icon: BookOpen, color: 'bg-yellow-100' }
            ].map((category) => (
              <div key={category.name} className={`${category.color} p-4 rounded-lg text-center transform transition-transform hover:scale-105`}>
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <category.icon className="h-8 w-8 text-gray-600" />
                </div>
                <h4 className="font-semibold">{category.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Tests */}
        <section className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-semibold mb-4">Featured Tests</h3>
          <Tabs defaultValue="personality" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personality">Personality Tests</TabsTrigger>
              <TabsTrigger value="academic">Academic Tests</TabsTrigger>
            </TabsList>
            <TabsContent value="personality">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Brain className="h-8 w-8 text-purple-500 mb-2" />
                  <h4 className="font-semibold mb-2">Big Five Personality Test</h4>
                  <p>Discover your key personality traits and how they influence your behavior.</p>
                  <Button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white">Take Test</Button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Users className="h-8 w-8 text-green-500 mb-2" />
                  <h4 className="font-semibold mb-2">Career Path Finder</h4>
                  <p>Find the perfect career based on your personality and interests.</p>
                  <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">Take Test</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="academic">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <GraduationCap className="h-8 w-8 text-blue-500 mb-2" />
                  <h4 className="font-semibold mb-2">SAT Practice Test</h4>
                  <p>Prepare for the SAT with our comprehensive practice test.</p>
                  <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">Start Practice</Button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <BookOpen className="h-8 w-8 text-yellow-500 mb-2" />
                  <h4 className="font-semibold mb-2">Study Skills Assessment</h4>
                  <p>Evaluate and improve your study habits for better academic performance.</p>
                  <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white">Take Assessment</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Leaderboard and Achievements */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Top Performers</h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Rank</span>
                <span className="font-semibold">User</span>
                <span className="font-semibold">Score</span>
              </div>
              {[
                { rank: 1, name: 'BrainMaster', score: 9850 },
                { rank: 2, name: 'QuizWhiz', score: 9720 },
                { rank: 3, name: 'StudyGuru', score: 9650 },
              ].map((player) => (
                <div key={player.rank} className="flex justify-between items-center py-2 border-t">
                  <span>{player.rank}</span>
                  <span>{player.name}</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">{player.score}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Your Achievements</h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {[
                { name: 'Self-Discovery Novice', description: 'Complete your first personality test' },
                { name: 'Academic Ace', description: 'Score 90% or higher on an academic test' },
                { name: 'Well-Rounded Scholar', description: 'Take tests in all categories' },
              ].map((achievement, index) => (
                <div key={index} className="flex items-start space-x-2 mb-4">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{achievement.name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Challenge */}
        <section className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-semibold mb-4">Daily Brain Teaser</h3>
          <p className="mb-4">Challenge yourself daily to improve your cognitive skills and earn bonus points!</p>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Today&apos;s Challenge: Logic Puzzle</h4>
            <p className="mb-4">Solve a mind-bending logic puzzle to boost your critical thinking skills.</p>
            <Button className="bg-green-500 hover:bg-green-600 text-white">Start Challenge</Button>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-blue-100 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
          <p className="mb-4">Subscribe to our newsletter for weekly study tips, test strategies, and exclusive content.</p>
          <form className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-grow" />
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Subscribe</Button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <Brain className="h-10 w-10 text-blue-600 mb-2" />
              <p>&copy; 2023 Aimify. All rights reserved.</p>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h4 className="font-semibold mb-2">Connect with Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600"><Facebook size={24} /></a>
                <a href="#" className="text-gray-600 hover:text-blue-600"><Twitter size={24} /></a>
                <a href="#" className="text-gray-600 hover:text-blue-600"><Instagram size={24} /></a>
                <a href="#" className="text-gray-600 hover:text-blue-600"><Youtube size={24} /></a>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <Globe size={24} className="mr-2" />
            <select className="bg-white border border-gray-300 rounded px-2 py-1">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  )
}