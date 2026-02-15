import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Property from '@/models/Property';

const TYPE_MAP = {
  flat: 'Apartment',
  house: 'Independent House',
  villa: 'Villa',
  plot: 'Plot',
  commercial: 'Commercial',
  studio: 'Studio',
};

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const type = searchParams.get('type');
    const bhk = searchParams.get('bhk');
    const listingType = searchParams.get('listingType');
    const status = searchParams.get('status');
    const verified = searchParams.get('verified');
    const luxury = searchParams.get('luxury');
    const category = searchParams.get('category'); // verified | upcoming | houses-villas | luxury

    const filter = {};
    if (city) filter.city = new RegExp(city, 'i');
    if (type) {
      filter.propertyType = TYPE_MAP[type.toLowerCase()] || type;
    }
    if (bhk) filter.bhk = parseInt(bhk, 10);
    if (listingType) filter.listingType = listingType;
    if (status) filter.status = status;
    if (verified === '1' || category === 'verified') filter.verified = true;
    if (category === 'upcoming') filter.status = 'Under Construction';
    if (category === 'houses-villas') {
      filter.propertyType = { $in: ['Independent House', 'Villa'] };
    }
    if (luxury === '1' || category === 'luxury') {
      filter.price = { $gte: 10000000 }; // 1 Crore+ for luxury
    }

    const properties = await Property.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(properties);
  } catch (error) {
    console.error('GET /api/properties error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const property = await Property.create(body);
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error('POST /api/properties error:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
