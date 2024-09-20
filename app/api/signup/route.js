import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/db"; // Import your connection logic
import user from "../../../lib/models/user";

export async function POST(request) {
  try {
 
    const body = await request.json();
    const { name, phone, age, gender, email, guardianEmail, guardianPhone, password } = body;

    // Connect to the database
    await connect();

    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newUser = new user({
      name,
      phone,
      age,
      gender,
      email,
      guardianEmail,
      guardianPhone,
      password: hashedPassword,
    });

 
    await newUser.save();
 
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
