import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      username, // Capturing username from the request JSON
      email,
      university,
      gender,
      profile_picture_url,
      location,
      interests,
    } = await request.json();

    // Inserting the user data into the user_tinder table
    await sql`
      INSERT INTO user_tinder (
        name,  
        email, 
        university,
        gender, 
        profile_picture_url,
        location, 
        interests
      )
      VALUES (
        ${username}, 
        ${email}, 
        ${university},
        ${gender}, 
        ${profile_picture_url},
        ${location}, 
        ${interests}
      );
    `;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error inserting data:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
