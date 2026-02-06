import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Phone, User, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { restaurantInfo } from '../restaurantMock';

const ReservationPage = () => {
  const navigate = useNavigate();
  const outlet = restaurantInfo.outlets[0];
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    reservationDate: '',
    reservationTime: '',
    numberOfGuests: '2'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.reservationDate) {
      newErrors.reservationDate = 'Date is required';
    } else {
      const selectedDate = new Date(formData.reservationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.reservationDate = 'Please select a future date';
      }
    }
    
    if (!formData.reservationTime) {
      newErrors.reservationTime = 'Time is required';
    }
    
    if (!formData.numberOfGuests || parseInt(formData.numberOfGuests) < 1) {
      newErrors.numberOfGuests = 'Please select number of guests';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }
    
    // Store reservation in localStorage (backend integration later)
    const reservations = JSON.parse(localStorage.getItem('table_reservations') || '[]');
    const newReservation = {
      ...formData,
      id: Date.now(),
      outletId: outlet.id,
      outletName: outlet.name,
      status: 'pending',
      createdAt: new Date().toISOString(),
      confirmationCode: Math.random().toString(36).substring(2, 10).toUpperCase()
    };
    
    reservations.push(newReservation);
    localStorage.setItem('table_reservations', JSON.stringify(reservations));
    
    toast.success('Table Reserved Successfully!', {
      description: `Confirmation Code: ${newReservation.confirmationCode}`,
      duration: 5000
    });
    
    // Navigate to menu
    setTimeout(() => {
      navigate('/menu');
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 11; hour <= 22; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  // Get today's date for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#579c2c] transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back</span>
            </button>
            <img 
              src={restaurantInfo.logo} 
              alt={restaurantInfo.name}
              className="h-10 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Reserve a Table</h1>
            <p className="text-sm text-gray-600">Book your table at {outlet.name}</p>
          </div>

          {/* Reservation Form */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Enter your name"
                    className={`pl-10 py-5 text-sm ${errors.customerName ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.customerName && (
                  <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    className={`pl-10 py-5 text-sm ${errors.customerPhone ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.customerPhone && (
                  <p className="text-xs text-red-500 mt-1">{errors.customerPhone}</p>
                )}
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Date Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    <Input
                      type="date"
                      value={formData.reservationDate}
                      onChange={(e) => handleInputChange('reservationDate', e.target.value)}
                      min={today}
                      className={`pl-10 py-5 text-sm ${errors.reservationDate ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.reservationDate && (
                    <p className="text-xs text-red-500 mt-1">{errors.reservationDate}</p>
                  )}
                </div>

                {/* Time Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    <select
                      value={formData.reservationTime}
                      onChange={(e) => handleInputChange('reservationTime', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-[#579c2c] ${
                        errors.reservationTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.reservationTime && (
                    <p className="text-xs text-red-500 mt-1">{errors.reservationTime}</p>
                  )}
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Number of Guests *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  <select
                    value={formData.numberOfGuests}
                    onChange={(e) => handleInputChange('numberOfGuests', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-[#579c2c] ${
                      errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                    <option value="10+">10+ Guests</option>
                  </select>
                </div>
                {errors.numberOfGuests && (
                  <p className="text-xs text-red-500 mt-1">{errors.numberOfGuests}</p>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> You will receive a confirmation code after booking. 
                  Please show it at the restaurant when you arrive.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#579c2c] hover:bg-[#579c2c]/90 text-white py-5 text-sm font-medium"
              >
                Reserve Table
              </Button>
            </form>
          </div>

          {/* Restaurant Info */}
          <div className="mt-4 bg-white rounded-lg shadow-sm border p-4">
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-[#579c2c]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#579c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{outlet.name}</p>
                  <p className="text-xs text-gray-600">{outlet.address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-[#579c2c]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#579c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Opening Hours</p>
                  <p className="text-xs text-gray-600">{outlet.openingHours}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-[#579c2c]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#579c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Contact</p>
                  <p className="text-xs text-gray-600">{outlet.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
