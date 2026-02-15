import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Property from '@/models/Property';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const property = await Property.findById(params.id).lean();
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json(property);
  } catch (error) {
    console.error('GET /api/properties/[id] error:', error);
    return NextResponse.json(null, { status: 404 });
  }
}
