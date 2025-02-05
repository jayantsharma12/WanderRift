import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['solo', 'group', 'college', 'corporate'],
    required: true
  },
  description: String,
  itinerary: [{
    day: Number,
    activities: [String]
  }],
  images: [String],
  dateRange: {
    start: Date,
    end: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Trip || mongoose.model('Trip', tripSchema);