"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

export function HealthInfoFormComponent() {
  const [hasDiagnosis, setHasDiagnosis] = useState(false);
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const fileInputRef = useRef(null);

  const fetchDiagnosisList = async () => {
    try {
      const response = await fetch('/api/diagnosis-list'); // Ensure this endpoint exists
      if (response.ok) {
        const data = await response.json();
        setDiagnosisList(data);
      } else {
        console.error('Failed to fetch diagnosis list');
      }
    } catch (error) {
      console.error('Error fetching diagnosis list:', error);
    }
  };

  useEffect(() => {
    if (hasDiagnosis) {
      fetchDiagnosisList();
    }
  }, [hasDiagnosis]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageBase64(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    // Add the base64 image and hasDiagnosis to the form values
    formValues.reportImage = imageBase64;
    formValues.hasDiagnosis = hasDiagnosis; // Boolean

    try {
      const response = await fetch('/api/submit-health-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        // Optionally, reset the form here
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Error submitting form'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Health Information Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="bmi">BMI</Label>
              <Input type="number" id="bmi" name="bmi" placeholder="Enter your BMI" required />
            </div>

            <div>
              <Label>Hypertension</Label>
              <RadioGroup defaultValue="no" name="hypertension" className="flex space-x-4">
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
              <RadioGroup defaultValue="no" name="smokingHistory" className="flex space-x-4">
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
              <Input type="text" id="blood-group" name="bloodGroup" placeholder="Enter your blood group" required />
            </div>

            <div>
              <Label htmlFor="glucose-level">Blood Glucose Level</Label>
              <Input type="number" id="glucose-level" name="glucoseLevel" placeholder="Enter your blood glucose level" required />
            </div>

            <div>
              <Label>Any Serious Diagnosis in Past</Label>
              <RadioGroup 
                defaultValue="no" 
                name="hasDiagnosis"
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
                <Select name="diagnosisType" required={hasDiagnosis}>
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
              <Label htmlFor="report-upload">Upload Doctor's Report (Image only)</Label>
              <div className="mt-2">
                <Label 
                  htmlFor="report-upload" 
                  className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  <span className="flex items-center space-x-2">
                    <Upload className="w-6 h-6 text-gray-600" />
                    <span className="font-medium text-gray-600">
                      Drop image to Attach, or <span className="text-blue-600 underline">browse</span>
                    </span>
                  </span>
                  <input 
                    id="report-upload" 
                    name="reportUpload"
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                </Label>
              </div>
              {imagePreview && (
                <div className="mt-4 relative">
                  <img src={imagePreview} alt="Report Preview" className="max-h-32 mx-auto rounded-md" />
                  <Button 
                    type="button" 
                    onClick={removeImage} 
                    className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
