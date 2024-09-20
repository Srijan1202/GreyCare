"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as LucideIcons from "lucide-react"

// Shadcn UI components
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

export default function ModernAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [errors, setErrors] = useState({})
  const [formMessage, setFormMessage] = useState("")

  const validateForm = (formData) => {
    const newErrors = {}

    const phoneNumber = formData.get("phone")
    if (phoneNumber && !/^(0\d{10}|\d{10})$/.test(phoneNumber)) {
      newErrors.phone = "Phone number must be 10 digits, or 11 digits if starting with 0"
    }

    const email = formData.get("email")
    if (email) {
      const validEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
      const emailRegex = new RegExp(`^[a-zA-Z0-9._-]+@(${validEmailDomains.join("|")})$`)
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address from a renowned provider"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    if (validateForm(formData)) {
      const url = isLogin ? "/api/login" : "/api/signup"
      const formValues = Object.fromEntries(formData.entries())

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
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
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }

  const switchVariants = {
    login: { x: "0%" },
    signup: { x: "100%" }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="relative">
            <motion.div 
              className="absolute top-0 left-0 w-1/2 h-1 bg-blue-500"
              variants={switchVariants}
              animate={isLogin ? "login" : "signup"}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <div className="grid grid-cols-2">
              <Button 
                variant="ghost" 
                onClick={() => setIsLogin(true)}
                className={`py-4 rounded-none ${isLogin ? 'text-blue-600' : 'text-gray-500'}`}
              >
                Login
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsLogin(false)}
                className={`py-4 rounded-none ${!isLogin ? 'text-blue-600' : 'text-gray-500'}`}
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
              className="p-6"
            >
              {isLogin ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-phone" className="text-gray-700">Phone Number</Label>
                    <div className="relative">
                      <LucideIcons.Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input id="login-phone" name="phone" type="tel" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                    </div>
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-700">Password</Label>
                    <div className="relative">
                      <LucideIcons.Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input id="login-password" name="password" type="password" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Login <LucideIcons.ChevronRight className="ml-2" size={18} />
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-gray-700">Gender</Label>
                    <div className="relative">
                      <LucideIcons.Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Select name="gender" required className="pl-10 bg-gray-50 text-gray-900 border-gray-300">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
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
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Sign Up <LucideIcons.ChevronRight className="ml-2" size={18} />
                  </Button>
                </form>
              )}
              {formMessage && (
                <p className={`text-sm mt-4 ${formMessage.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                  {formMessage}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}