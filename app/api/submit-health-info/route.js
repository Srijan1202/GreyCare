import { NextResponse } from "next/server";
import connect from "@/lib/db"; // Import your connection logic
import HealthInfo from "@/lib/models/HealthInfo"; // Updated path to the HealthInfo model

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { bmi, hypertension, smokingHistory, bloodGroup, glucoseLevel, hasSeriousDiagnosis } = body;

    // Connect to the database
    await connect();

    // Create a new HealthInfo document
    const healthInfo = new HealthInfo({
      bmi,
      hypertension,
      smokingHistory,
      bloodGroup,
      glucoseLevel,
      hasSeriousDiagnosis: hasSeriousDiagnosis ?? false, // Use provided value or default to false
    });

    // Save the document to the database
    await healthInfo.save();

    // Respond with success
    return NextResponse.json({ message: "Health info submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error submitting health info:", error); // More specific error logging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
