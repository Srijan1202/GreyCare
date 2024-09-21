import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/db";
import User from "@/lib/models/user";

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { phone, email, password } = body;

    // Connect to the database
    await connect();

    // Check if the user exists based on phone number or email
    let user;
    if (phone) {
      user = await User.findOne({ phone });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Prepare user data to send back (excluding sensitive information)
    const userData = {
      id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      // Add any other fields you want to send back
    };

    // Respond with success and user data
    return NextResponse.json({ message: "Login successful", user: userData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}