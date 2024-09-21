"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function HealthInfoFormComponent() {
  const [hasDiagnosis, setHasDiagnosis] = useState(false)
  const [diagnosisList, setDiagnosisList] = useState([])

  const fetchDiagnosisList = async () => {
    // Simulating an API call to fetch diagnosis list
    const response = await fetch('/api/diagnosis-list')
    const data = await response.json()
    setDiagnosisList(data)
  }

  useEffect(() => {
    if (hasDiagnosis) {
      fetchDiagnosisList()
    }
  }, [hasDiagnosis])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Health Information Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <Label htmlFor="bmi">BMI</Label>
              <Input type="number" id="bmi" placeholder="Enter your BMI" />
            </div>

            <div>
              <Label>Hypertension</Label>
              <RadioGroup defaultValue="no" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="hypertension-yes" />
                  <Label htmlFor="hypertension-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hypertension-no" />
                  <Label htmlFor="hypertension-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Smoking History</Label>
              <RadioGroup defaultValue="no" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="smoking-yes" />
                  <Label htmlFor="smoking-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="smoking-no" />
                  <Label htmlFor="smoking-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quit" id="smoking-quit" />
                  <Label htmlFor="smoking-quit">Has Quit</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="blood-group">Blood Group</Label>
              <Input type="text" id="blood-group" placeholder="Enter your blood group" />
            </div>

            <div>
              <Label htmlFor="glucose-level">Blood Glucose Level</Label>
              <Input type="number" id="glucose-level" placeholder="Enter your blood glucose level" />
            </div>

            <div>
              <Label>Any Serious Diagnosis in Past</Label>
              <RadioGroup 
                defaultValue="no" 
                className="flex space-x-4"
                onValueChange={(value) => setHasDiagnosis(value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="diagnosis-yes" />
                  <Label htmlFor="diagnosis-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="diagnosis-no" />
                  <Label htmlFor="diagnosis-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {hasDiagnosis && (
              <div>
                <Label htmlFor="diagnosis-type">Type of Diagnosis</Label>
                <Select>
                  <SelectTrigger id="diagnosis-type">
                    <SelectValue placeholder="Select diagnosis type" />
                  </SelectTrigger>
                  <SelectContent>
                    {diagnosisList.map((diagnosis) => (
                      <SelectItem key={diagnosis.value} value={diagnosis.value}>
                        {diagnosis.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="report-upload">Upload Doctor's Reports</Label>
              <div className="mt-2">
                <Label 
                  htmlFor="report-upload" 
                  className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  <span className="flex items-center space-x-2">
                    <Upload className="w-6 h-6 text-gray-600" />
                    <span className="font-medium text-gray-600">
                      Drop files to Attach, or <span className="text-blue-600 underline">browse</span>
                    </span>
                  </span>
                  <input id="report-upload" type="file" className="hidden" multiple />
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}