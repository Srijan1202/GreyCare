"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as LucideIcons from "lucide-react"

// Shadcn UI components (unchanged)
const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
))
Button.displayName = "Button"

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
))
Input.displayName = "Input"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
))
Label.displayName = "Label"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

const Select = React.forwardRef(({ children, ...props }, ref) => (
  <select
    ref={ref}
    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  >
    {children}
  </select>
))
Select.displayName = "Select"

export default function EnhancedAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [errors, setErrors] = useState({})
  const [formMessage, setFormMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (formData) => {
    const newErrors = {}

    const email = formData.get("email")
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    const password = formData.get("password")
    if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!isLogin) {
      const phone = formData.get("phone")
      if (phone && !/^(0\d{10}|\d{10})$/.test(phone)) {
        newErrors.phone = "Phone number must be 10 digits, or 11 digits if starting with 0"
      }

      const age = formData.get("age")
      if (age && (isNaN(age) || age < 1 || age > 120)) {
        newErrors.age = "Please enter a valid age"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setFormMessage("")
    const formData = new FormData(event.target)
  
    if (validateForm(formData)) {
      const url = isLogin ? "/api/login" : "/api/signup"
      const formValues = Object.fromEntries(formData.entries())
  
      const body = isLogin
        ? {
            email: formValues.email,
            password: formValues.password
          }
        : {
            name: formValues.name,
            phone: formValues.phone,
            age: formValues.age,
            gender: formValues.gender,
            email: formValues.email,
            guardianEmail: formValues.guardianEmail,
            guardianPhone: formValues.guardianPhone,
            password: formValues.password
          }
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
  
        const result = await response.json()
  
        if (response.ok) {
          setFormMessage(isLogin ? "Login successful!" : "Sign up successful!")
        } else {
          setFormMessage(result.error || "An error occurred. Please try again.")
        }
      } catch (error) {
        console.error("API error: ", error)
        setFormMessage("An unexpected error occurred. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.5,
        ease: "easeIn"
      }
    }
  }

  const switchVariants = {
    login: { x: "0%" },
    signup: { x: "100%" }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <Card className="w-full max-w-md overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="relative mb-6">
            <motion.div 
              className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500"
              variants={switchVariants}
              animate={isLogin ? "login" : "signup"}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <div className="grid grid-cols-2">
              <Button 
                variant="ghost" 
                onClick={() => setIsLogin(true)}
                className={`py-4 rounded-none ${isLogin ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
              >
                Login
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsLogin(false)}
                className={`py-4 rounded-none ${!isLogin ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
              >
                Sign Up
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="px-6 pb-6"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {isLogin ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-gray-700">Email</Label>
                      <div className="relative">
                        <LucideIcons.Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="login-email" name="email" type="email" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                      </div>
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-gray-700">Password</Label>
                      <div className="relative">
                        <LucideIcons.Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="login-password" name="password" type="password" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                      </div>
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">Name</Label>
                      <div className="relative">
                        <LucideIcons.User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="name" name="name" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                      <div className="relative">
                        <LucideIcons.Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="phone" name="phone" type="tel" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                      </div>
                      {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-gray-700">Age</Label>
                      <div className="relative">
                        <LucideIcons.Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="age" name="age" type="number" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                      </div>
                      {errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-gray-700">Gender</Label>
                      <div className="relative">
                        <LucideIcons.Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Select name="gender" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300">
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">Email</Label>
                      <div className="relative">
                        <LucideIcons.Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="email" name="email" type="email" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                      </div>
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardian-email" className="text-gray-700">Guardian Email</Label>
                      <div className="relative">
                        <LucideIcons.Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="guardian-email" name="guardianEmail" type="email" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardian-phone" className="text-gray-700">Guardian Phone Number</Label>
                      <div className="relative">
                        <LucideIcons.Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="guardian-phone" name="guardianPhone" type="tel" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-gray-700">Password</Label>
                      <div className="relative">
                        <LucideIcons.Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="signup-password" name="password" type="password" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                      </div>
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>
                  </>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LucideIcons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? 'Login' : 'Sign Up'} <LucideIcons.ChevronRight className="ml-2" size={18} />
                    </>
                  )}
                </Button>
              </form>
              {formMessage && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm mt-4 p-2 rounded ${formMessage.includes("successful") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {formMessage}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}