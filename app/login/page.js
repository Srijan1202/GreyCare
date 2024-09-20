"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Custom hook for authentication
const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (phone, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: phone, password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Login failed')
      return data
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Signup failed')
      return data
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { login, signup, isLoading, error }
}

export function AuthComponentJsx() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({})
  const { login, signup, isLoading, error } = useAuth()
  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    
    try {
      if (isLogin) {
        const data = await login(formData.phone, formData.password)
        setMessage(data.message || 'Login successful')
      } else {
        const data = await signup(formData)
        setMessage(data.message || 'Signup successful')
      }
    } catch (err) {
      setMessage(error || 'An error occurred')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 px-4 text-center ${
                isLogin ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${
                !isLogin ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        required
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="guardianEmail" className="block text-sm font-medium text-gray-700">
                        Guardian Email
                      </label>
                      <input
                        type="email"
                        id="guardianEmail"
                        name="guardianEmail"
                        required
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="guardianPhone" className="block text-sm font-medium text-gray-700">
                        Guardian Phone Number
                      </label>
                      <input
                        type="tel"
                        id="guardianPhone"
                        name="guardianPhone"
                        required
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
          {message && (
            <div className={`mt-4 p-2 ${error ? 'bg-red-100 border-red-300 text-red-800' : 'bg-green-100 border-green-300 text-green-800'} border rounded-md text-center text-sm`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default AuthComponentJsx;