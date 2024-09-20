"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Activity, Stethoscope, Apple } from "lucide-react"

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [errors, setErrors] = useState({})

  const validateForm = (formData) => {
    const newErrors = {}

    // Phone number validation
    const phoneNumber = formData.get('phone')
    if (phoneNumber) {
      if (!/^(0\d{10}|\d{10})$/.test(phoneNumber)) {
        newErrors.phone = "Phone number must be 10 digits, or 11 digits if starting with 0"
      }
    }

    // Email validation
    const email = formData.get('email')
    if (email) {
      const validEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
      const emailRegex = new RegExp(`^[a-zA-Z0-9._-]+@(${validEmailDomains.join('|')})$`)
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address from a renowned provider"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    if (validateForm(formData)) {
      // Handle form submission logic here
      console.log("Form submitted successfully")
    } else {
      console.log("Form has errors")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Background health-related vectors */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Heart className="absolute top-1/4 left-1/4 text-red-300 w-16 h-16 transform -rotate-12" />
        <Activity className="absolute top-1/3 right-1/4 text-green-300 w-20 h-20 transform rotate-12" />
        <Stethoscope className="absolute bottom-1/4 left-1/3 text-blue-300 w-24 h-24 transform -rotate-6" />
        <Apple className="absolute bottom-1/3 right-1/3 text-yellow-300 w-16 h-16 transform rotate-6" />
      </motion.div>

      <motion.div
        className="z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>User Authentication</CardTitle>
            <CardDescription>Login or sign up to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={isLogin ? "login" : "signup"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" onClick={() => setIsLogin(false)}>
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-phone">Phone Number</Label>
                    <Input id="login-phone" name="phone" type="tel" required />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name="age" type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select name="gender" required>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardian-email">Guardian Email</Label>
                    <Input id="guardian-email" name="guardianEmail" type="email" required />
                    {errors.guardianEmail && <p className="text-sm text-red-500">{errors.guardianEmail}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardian-phone">Guardian Phone Number</Label>
                    <Input id="guardian-phone" name="guardianPhone" type="tel" required />
                    {errors.guardianPhone && <p className="text-sm text-red-500">{errors.guardianPhone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default UserAuth