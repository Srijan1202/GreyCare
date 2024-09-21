'use client'

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Heart, HelpCircle, Home, Menu, User, X, Clock, Phone, MessageCircle, ChevronUp, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const sendEmergencyMessage = () => {
    alert("Emergency message sent to guardian!");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold">GreyCare</div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Instant Clinic</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Contact Guardian</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Support</a>
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
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Instant Clinic</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact Guardian</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Support</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.5 }}
      className="px-4 py-24 md:py-32 lg:py-40"
    >
      <div className="container mx-auto text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
        >
          Welcome to GreyCare
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 max-w-2xl mx-auto"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
        >
          Empowering seniors to live independently and comfortably with our innovative digital solutions.
        </motion.p>
        <motion.div
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
        >
          <Button size="lg" className="mr-4">Get Started</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

const CalendarSection = () => {
  const [date, setDate] = useState(new Date());
  const events = [
    { date: new Date(2023, 5, 15), title: "Doctor's Appointment" },
    { date: new Date(2023, 5, 20), title: "Family Visit" },
    { date: new Date(2023, 5, 25), title: "Pharmacy Pickup" },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.5 }}
      className="px-4 py-12 bg-white"
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border self-start"
          />
          <div className="flex-1 bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Event Notes</h3>
            <ul className="space-y-2">
              {events.map((event, index) => (
                <li key={index} className="bg-white p-2 rounded shadow">
                  <span className="font-medium">{event.date.toDateString()}</span>: {event.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const ClockSection = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.5 }}
      className="px-4 py-12 bg-gray-100"
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Medication Schedule</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center space-x-2 text-4xl font-bold mb-6">
            <div className="bg-primary text-primary-foreground p-2 rounded">{formatTime(time.getHours())}</div>
            <div className="bg-primary text-primary-foreground p-2 rounded">{formatTime(time.getMinutes())}</div>
            <div className="bg-primary text-primary-foreground p-2 rounded">{formatTime(time.getSeconds())}</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-100 rounded-md">
              <Clock className="h-6 w-6 mr-3 text-blue-500" />
              <span className="font-medium">Medicine A: 09:00 AM</span>
            </div>
            <div className="flex items-center p-3 bg-green-100 rounded-md">
              <Clock className="h-6 w-6 mr-3 text-green-500" />
              <span className="font-medium">Medicine B: 02:00 PM</span>
            </div>
            <div className="flex items-center p-3 bg-purple-100 rounded-md">
              <Clock className="h-6 w-6 mr-3 text-purple-500" />
              <span className="font-medium">Medicine C: 08:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const FeaturesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.5 }}
      className="px-4 py-12 bg-white"
    >
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
    </motion.section>
  );
};

const CTASection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.5 }}
      className="px-4 py-12 md:py-24 bg-gray-100"
    >
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
    </motion.section>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold mb-4 md:mb-0">GreyCare</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-300">Contact Us</a>
        </div>
      </div>
      <div className="mt-4 text-center text-sm">
        © {new Date().getFullYear()} GreyCare. All rights reserved.
      </div>
    </div>
  </footer>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed bottom-4 right-4 bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-80' :
    'w-auto'}`}>
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-lg font-semibold">Chat Support</h3>
        <Button variant="ghost" size="sm">
          {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </Button>
      </div>
      {isOpen && (
        <>
          <div className="h-40 overflow-y-auto border-t border-b py-2 px-4">
            {/* Chat messages would go here */}
          </div>
          <div className="flex p-4">
            <Input placeholder="Type a message..." className="mr-2" />
            <Button>Send</Button>
          </div>
        </>
      )}
    </div>
  );
};

export function LandingPageJsx() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pt-16">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CalendarSection />
        <ClockSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}