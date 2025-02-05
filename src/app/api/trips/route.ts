import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Trip from '../../models/Trip';

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