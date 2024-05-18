import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

interface User {
  name: string;
  gender: string;
  location: string;
  university: string;
  interests: string;
  email: string;
}

// Function to generate recommendations
async function getRecommendations(user: User) {
  const interestsArray = user.interests.split(", ");

  // Constructing the SQL query dynamically with parameterized queries
  const interestsConditions = interestsArray.map(
    (_, index) => `
    CASE WHEN interests LIKE '%' || $${index + 3} || '%' THEN 1 ELSE 0 END
  `
  );

  const interestsCondition = interestsConditions.join(" + ");

  const query = `
    WITH ranked_profiles AS (
      SELECT
        *,
        (CASE WHEN university = $1 THEN 1 ELSE 0 END) +
        (${interestsCondition}) +
        random() AS score
      FROM user_tinder
      WHERE email != $2
      ORDER BY score DESC
      LIMIT 10
    )
    SELECT * FROM ranked_profiles;
  `;

  const params = [user.university, user.email, ...interestsArray];
  const recommendations = await sql.query(query, params);

  return recommendations.rows;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Please provide an email parameter" },
      { status: 400 }
    );
  }

  try {
    const result = await sql<User[]>`
      SELECT * FROM user_tinder WHERE email = ${email}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "No user found with the provided email" },
        { status: 404 }
      );
    }

    const user = result.rows[0] as any;
    const recommendations = await getRecommendations(user);

    return NextResponse.json(recommendations, { status: 200 });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user data" },
      { status: 500 }
    );
  }
}
