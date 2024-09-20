'use client'

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Heart, HelpCircle, Home, Menu, User, X, Clock, Phone, MessageCircle } from "lucide-react";

const FlipClock = () => {
  const [time, setTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 text-4xl font-bold">
        <div className="bg-primary text-primary-foreground p-2 rounded">{formatTime(time.getHours())}</div>
        <div className="bg-primary text-primary-foreground p-2 rounded">{formatTime(time.getMinutes())}</div>
        <div className="bg-primary text-primary-foreground p-2 rounded">{formatTime(time.getSeconds())}</div>
      </div>
      <div className="mt-4 text-sm">
        <p>1. Medicine A: 09:00 AM</p>
        <p>2. Medicine B: 02:00 PM</p>
        <p>3. Medicine C: 08:00 PM</p>
      </div>
    </div>
  );
};

const CalendarWithNotes = () => {
  const [date, setDate] = useState(new Date());
  const events = [
    { date: new Date(2023, 5, 15), title: "Doctor's Appointment" },
    { date: new Date(2023, 5, 20), title: "Family Visit" },
    { date: new Date(2023, 5, 25), title: "Pharmacy Pickup" },
  ];

  return (
    <div className="flex space-x-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
              <span className="font-medium">{event.date.toDateString()}</span>: {event.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Chatbot = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Chat Support</h3>
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
      <div className="h-40 overflow-y-auto border-t border-b py-2 mb-2">
        {/* Chat messages would go here */}
      </div>
      <div className="flex">
        <Input placeholder="Type a message..." className="mr-2" />
        <Button>Send</Button>
      </div>
    </div>
  );
};

export function LandingPageJsx() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const sendEmergencyMessage = () => {
    alert("Emergency message sent to guardian!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold">GreyCare</div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">Instant Clinic</Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">Contact Guardian</Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">Support</Link>
            </div>
            <div className="flex items-center">
              <Button variant="destructive" size="sm" className="mr-4" onClick={sendEmergencyMessage}>
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Instant Clinic</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact Guardian</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Support</Link>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow">
        {/* Hero section */}
        <motion.section 
          className="px-4 py-12 md:py-24 lg:py-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome to GreyCare
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Empowering seniors to live independently and comfortably with our innovative digital solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button size="lg" className="mr-4">Get Started</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Calendar section */}
        <section className="px-4 py-12 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <CalendarWithNotes />
          </div>
        </section>

        {/* Clock section */}
        <section className="px-4 py-12 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Medication Schedule</h2>
            <FlipClock />
          </div>
        </section>

        {/* Features section */}
        <section className="px-4 py-12 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How GreyCare Helps</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Home className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Home Assistance</h3>
                <p>Get help with daily tasks and home maintenance.</p>
              </div>
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Health Monitoring</h3>
                <p>Keep track of your health with easy-to-use tools.</p>
              </div>
              <div className="text-center">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p>Access help and support whenever you need it.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="px-4 py-12 md:py-24 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join GreyCare Today</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Start your journey towards a more comfortable and independent lifestyle.
            </p>
            <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="w-full md:w-auto" />
              <Button type="submit">Sign Up</Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">GreyCare</div>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300">Privacy Policy</Link>
              <Link href="#" className="hover:text-gray-300">Terms of Service</Link>
              <Link href="#" className="hover:text-gray-300">Contact Us</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            © {new Date().getFullYear()} GreyCare. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}