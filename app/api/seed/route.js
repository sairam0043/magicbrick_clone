import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Property from '@/models/Property';

const DUMMY_PROPERTIES = [
  {
    title: 'Spacious 3 BHK in Koramangala',
    description: 'Well-ventilated apartment with modern amenities. Close to tech parks, schools, and hospitals. Gated community with 24/7 security.',
    price: 12500000,
    location: 'Koramangala 5th Block',
    city: 'Bangalore',
    propertyType: 'Apartment',
    bhk: 3,
    area: 1850,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    featured: true,
    verified: true,
    listingType: 'Buy',
    status: 'Ready to Move',
  },
  {
    title: 'Luxury 4 BHK Villa in Whitefield',
    description: 'Premium villa with private garden and modular kitchen. Ideal for families. Near international schools and IT hubs.',
    price: 28500000,
    location: 'Whitefield',
    city: 'Bangalore',
    propertyType: 'Villa',
    bhk: 4,
    area: 3200,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    featured: true,
    verified: true,
    listingType: 'Buy',
    status: 'Ready to Move',
  },
  {
    title: '2 BHK Ready-to-Move Apartment',
    description: 'Fully furnished 2 BHK with parking. Walking distance to metro. Low maintenance society.',
    price: 7200000,
    location: 'Indiranagar',
    city: 'Bangalore',
    propertyType: 'Apartment',
    bhk: 2,
    area: 1100,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    featured: true,
    verified: true,
    listingType: 'Buy',
    status: 'Ready to Move',
  },
  {
    title: 'Independent 3 BHK House in Pune',
    description: 'Corner plot house with ample natural light. Private terrace. Peaceful locality with good connectivity.',
    price: 9500000,
    location: 'Kothrud',
    city: 'Pune',
    propertyType: 'Independent House',
    bhk: 3,
    area: 2000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    featured: false,
    listingType: 'Buy',
    status: 'Under Construction',
  },
  {
    title: 'Residential Plot in Hyderabad',
    description: 'Clear title plot in developing area. Suitable for building villa or independent house. Near ORR.',
    price: 6500000,
    location: 'Gachibowli',
    city: 'Hyderabad',
    propertyType: 'Plot',
    bhk: 1,
    area: 2400,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    featured: false,
    listingType: 'Buy',
    status: 'Ready to Move',
  },
  {
    title: 'Compact 1 BHK Studio Apartment',
    description: 'Affordable studio with smart layout. Perfect for bachelors or small families. Near metro and markets.',
    price: 4200000,
    location: 'Electronic City',
    city: 'Bangalore',
    propertyType: 'Studio',
    bhk: 1,
    area: 550,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    featured: false,
    listingType: 'Buy',
    status: 'Ready to Move',
  },
  {
    title: '2 BHK Flat for Rent, Sarjapur Road',
    description: 'Semi-furnished 2 BHK available for rent. Gated society, power backup. Family preferred.',
    price: 28000,
    location: 'Sarjapur Road',
    city: 'Bangalore',
    propertyType: 'Apartment',
    bhk: 2,
    area: 1050,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    featured: true,
    listingType: 'Rent',
    status: 'Ready to Move',
  },
  {
    title: '3 BHK Villa for Rent, Koramangala',
    description: 'Fully furnished villa with garden. Monthly rent. Deposit 3 months.',
    price: 75000,
    location: 'Koramangala',
    city: 'Bangalore',
    propertyType: 'Villa',
    bhk: 3,
    area: 2200,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    featured: false,
    listingType: 'Rent',
    status: 'Ready to Move',
  },
];

export async function POST() {
  try {
    await connectDB();
    const existing = await Property.countDocuments();
    if (existing > 0) {
      return NextResponse.json({
        message: 'Database already has data. Skipping seed.',
        count: existing,
      });
    }
    await Property.insertMany(DUMMY_PROPERTIES);
    return NextResponse.json({
      message: 'Seed successful',
      count: DUMMY_PROPERTIES.length,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
