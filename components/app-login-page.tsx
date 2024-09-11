'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function AppLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempted with:', username, password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="relative">
              <Brain className="h-16 w-16 text-blue-600 mx-auto" />
            </div>
          </Link>
          <h1 className="text-4xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">
            Aimify
          </h1>
          <p className="text-gray-600 mt-2">Enter the realm of knowledge!</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-8 border border-gray-200">
          <div className="mb-4">
            <Label htmlFor="username" className="text-gray-700">Username</Label>
            <div className="relative">
              <Input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username" 
                className="mt-1 bg-white text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-yellow-500" />
            </div>
          </div>
          <div className="mb-6">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <div className="relative">
              <Input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                className="mt-1 bg-white text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-yellow-500" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            Enter
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            New to Aimify?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-500 transition duration-300">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-800 transition duration-300 inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to the Home
          </Link>
        </div>
      </div>
    </div>
  )
}