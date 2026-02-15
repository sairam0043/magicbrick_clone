import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ['Apartment', 'Independent House', 'Villa', 'Plot', 'Commercial', 'Studio'],
    },
    bhk: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    area: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    listingType: {
      type: String,
      enum: ['Buy', 'Rent'],
      default: 'Buy',
    },
    status: {
      type: String,
      enum: ['Ready to Move', 'Under Construction'],
      default: 'Ready to Move',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model('Property', propertySchema);
