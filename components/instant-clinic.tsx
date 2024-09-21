'use client'

import { useState } from 'react'

export function InstantClinicComponent() {
  const [selectedCondition, setSelectedCondition] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState({
    heartRate: '',
    bloodPressure: '',
    highBP: '',
    stroke: '',
    highCholesterol: '',
    cholesterolCheck: '',
    physicalActivity: '',
    eyeImage: null,
    hasDiabetes: '',
    hbA1cLevel: '',
    bloodGlucoseLevel: ''
  })

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition)
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setSelectedCondition('')
    setFormData({
      heartRate: '',
      bloodPressure: '',
      highBP: '',
      stroke: '',
      highCholesterol: '',
      cholesterolCheck: '',
      physicalActivity: '',
      eyeImage: null,
      hasDiabetes: '',
      hbA1cLevel: '',
      bloodGlucoseLevel: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? e.target.files[0] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Condition submitted:', { condition: selectedCondition, data: formData })
    handleClosePopup()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">GreyCare InstantClinic</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-6 space-y-8">
            <section className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to InstantClinic</h2>
              <p className="text-gray-600 mb-6">Get quick medical advice and support from the comfort of your home.</p>
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  Contact Doctor
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  Refill Medicine
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Your Condition</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {['Heart Problem', 'Eye Problem', 'Diabetes'].map((condition) => (
                  <button
                    key={condition}
                    onClick={() => handleConditionSelect(condition.toLowerCase().split(' ')[0])}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex flex-col items-center justify-center"
                  >
                    <span className="text-4xl mb-2">
                      {condition === 'Heart Problem' ? '❤️' : condition === 'Eye Problem' ? '👁️' : '🩸'}
                    </span>
                    {condition}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Health Tips</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Stay hydrated by drinking at least 8 glasses of water daily.</li>
                <li>Aim for 30 minutes of moderate exercise 5 days a week.</li>
                <li>Incorporate a variety of fruits and vegetables into your diet.</li>
                <li>Get 7-9 hours of sleep each night for optimal health.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedCondition === 'heart' && 'Heart Problem'}
              {selectedCondition === 'eye' && 'Eye Problem'}
              {selectedCondition === 'diabetes' && 'Diabetes'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedCondition === 'heart' && (
                <>
                  <input
                    type="text"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleInputChange}
                    placeholder="Heart Rate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    placeholder="Blood Pressure"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {['High BP', 'Stroke', 'High Cholesterol', 'Cholesterol Check', 'Physical Activity'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={option.toLowerCase().replace(' ', '')}
                          value="yes"
                          onChange={handleInputChange}
                          className="form-radio text-blue-500"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={option.toLowerCase().replace(' ', '')}
                          value="no"
                          onChange={handleInputChange}
                          className="form-radio text-blue-500"
                        />
                        <span>No</span>
                      </label>
                      <span>{option}?</span>
                    </div>
                  ))}
                </>
              )}
              {selectedCondition === 'eye' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Eye Image</label>
                  <input
                    type="file"
                    name="eyeImage"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              )}
              {selectedCondition === 'diabetes' && (
                <>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="hasDiabetes"
                        value="yes"
                        onChange={handleInputChange}
                        className="form-radio text-blue-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="hasDiabetes"
                        value="no"
                        onChange={handleInputChange}
                        className="form-radio text-blue-500"
                      />
                      <span>No</span>
                    </label>
                    <span>Do you have hypertension?</span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    name="hbA1cLevel"
                    value={formData.hbA1cLevel}
                    onChange={handleInputChange}
                    placeholder="HbA1c Level"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    step="0.1"
                    name="bloodGlucoseLevel"
                    value={formData.bloodGlucoseLevel}
                    onChange={handleInputChange}
                    placeholder="Blood Glucose Level"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">GreyCare</h3>
              <p className="mt-2 text-sm">Your health, our priority</p>
            </div>
            <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
              <p className="text-sm">&copy; 2023 GreyCare. All rights reserved.</p>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-right">
              <a href="#" className="text-sm hover:text-gray-300 mr-4">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-gray-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}