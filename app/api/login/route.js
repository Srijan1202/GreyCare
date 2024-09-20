import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/db"; // Import your connection logic
import User from "@/lib/models/user"; // Updated path to the User model

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { phone, password } = body; // Use phone instead of email

    // Connect to the database
    await connect();

    // Check if the user exists based on phone number
    const user = await User.findOne({ phone });
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Respond with success
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
