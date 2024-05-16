import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const apiUrl = "https://reqres.in/api/users";

export async function GET(req: Request, res: Response) {
  const response = await fetch(apiUrl);

  const todos: any[] = await response.json();

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const { page, per_page } = requestData;

    if (page === undefined || per_page === undefined) {
      return new Response(
        JSON.stringify({ error: "page and per_page parameters are required" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const apiUrlWithParams = `${apiUrl}?page=${page}&per_page=${per_page}`;
    const response = await fetch(apiUrlWithParams);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from the external API" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500, // You can choose an appropriate status code for server errors
        },
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500, // Internal Server Error
    });
  }
}
