'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Settings, Car, User, Plus, Search, X, Eye } from 'lucide-react';

// Initial data
const initialDestinations = [
  {
    name: 'Char Dham',
    image: '/api/placeholder/400/300', // Using placeholder images instead of external URLs
    description: 'Badrinath, Kedarnath, Gangotri, Yamunotri',
    price: '₹33,956/-',
    pickupLocation: 'Delhi to Delhi'
  },
  {
    name: 'Varanasi',
    image: '/api/placeholder/400/300',
    description: 'Kashi Vishwanath Temple',
    price: '₹7,190/-',
    pickupLocation: 'Delhi to Delhi'
  },
  {
    name: 'Amritsar',
    image: '/api/placeholder/400/300',
    description: 'The Golden Temple',
    price: '₹6,384/-',
    pickupLocation: 'Delhi to Delhi'
  },
  {
    name: 'Puri',
    image: '/api/placeholder/400/300',
    description: 'Jagannatha Temple',
    price: '₹13,348/-',
    pickupLocation: 'Delhi to Delhi',
  },
];

const TravelHomePage = () => {
  // States
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [pdfName, setPdfName] = useState('');
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [newDestination, setNewDestination] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    pickupLocation: '',
    itinerary: '',
  });
  interface Destination {
    name: string;
    image: string;
    description: string;
    price: string;
    pickupLocation: string;
    itinerary?: File; // Add the itinerary property to the Destination interface
  }
  

  // Filter destinations based on search
  const filteredDestinations = destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      // Remove non-numeric characters and format price
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue) {
        const formattedPrice = `₹${parseInt(numericValue).toLocaleString('en-IN')}/-`;
        setNewDestination(prev => ({ ...prev, [name]: formattedPrice }));
      } else {
        setNewDestination(prev => ({ ...prev, [name]: '' }));
      }
    } else {
      setNewDestination(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle file uploads
  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    if (!files.length) return;

    const file = files[0];
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [name]: 'File size should be less than 5MB'
      }));
      return;
    }

    if (name === 'image') {
      // Handle image upload
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Please upload a valid image file'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setNewDestination(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    } else if (name === 'itinerary') {
      // Handle PDF upload
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          itinerary: 'Please upload a PDF file'
        }));
        return;
      }
      setPdfName(file.name);
      setNewDestination(prev => ({ ...prev, itinerary: file }));
    }

    // Clear errors for this field
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Validate required fields
      if (!newDestination.name || !newDestination.image || !newDestination.price) {
        throw new Error('Please fill in all required fields');
      }

      // Add new destination
      setDestinations(prev => [...prev, { ...newDestination }]);
      
      // Reset form
      setIsFormOpen(false);
      setNewDestination({
        name: '',
        image: '',
        description: '',
        price: '',
        pickupLocation: '',
        itinerary: '',
      });
      setImagePreview('');
      setPdfName('');
      setErrors({});
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: error.message }));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-blue-600 py-16 px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Find Your Perfect Trip</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-2 flex items-center gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <div className="flex items-center">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-0 focus:ring-0 outline-none"
              />
            </div>
          </div>
          <button className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <MessageCircle className="w-6 h-6" />, title: 'LIVE Chat Assistance' },
            { icon: <Settings className="w-6 h-6" />, title: 'Customization of Packages' },
            { icon: <Car className="w-6 h-6" />, title: 'Car Inclusive Packages' },
            { icon: <User className="w-6 h-6" />, title: 'Guide Assistance' }
          ].map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <div className="text-orange-500">{benefit.icon}</div>
              <span className="text-sm font-medium">{benefit.title}</span>
            </div>
          ))}
        </div>

        {/* Destinations Grid */}
        <h2 className="text-2xl font-bold text-center mb-8">Pick destinations for your spiritual journey:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((destination, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-xl font-semibold">{destination.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">{destination.description}</p>
                <p className="text-xs text-gray-500 mb-2">{destination.pickupLocation}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">starting from</p>
                    <p className="text-blue-600 font-semibold">{destination.price}</p>
                  </div>
                  <button
  className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800"
  onClick={() => {
    if (destination.itinerary) {
      const itineraryUrl = URL.createObjectURL(destination.itinerary);
      window.open(itineraryUrl, '_blank');
    } else {
      alert('No itinerary available for this destination.');
    }
  }}
>
  EXPLORE MORE
</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Destination Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700"
        onClick={() => setIsFormOpen(true)}
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Destination Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Destination</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {errors.submit && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newDestination.name}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image *</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full border rounded p-2"
                    required
                  />
                  {/* {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )} */}
                  {imagePreview && (
                    <div className="mt-2 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newDestination.description}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    //rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price *</label>
                  <input
                    type="text"
                    name="price"
                    value={newDestination.price}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                    placeholder="Enter amount in ₹"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Pickup Location</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={newDestination.pickupLocation}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    placeholder="e.g., Delhi to Delhi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Itinerary (PDF)</label>
                  <input
                    type="file"
                    name="itinerary"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="w-full border rounded p-2"
                  />
                  {errors.itinerary && (
                    <p className="text-red-500 text-sm mt-1">{errors.itinerary}</p>
                  )}
                  {pdfName && (
                    <p className="text-sm text-gray-600 mt-1">Selected: {pdfName}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-400"
                  disabled={isUploading}
                >
                  {isUploading ? 'Adding...' : 'Add Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelHomePage;