import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import {Trip} from '../../models/Trip';

export async function GET() {
  try {
    await connectDB();
    const trips = await Trip.find({});
    return NextResponse.json({ trips });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const trip = await Trip.create(data);
    return NextResponse.json({ trip });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (email === "test@example.com" && password === "password123") {
      return res.status(200).json({ message: "Login successful!" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}