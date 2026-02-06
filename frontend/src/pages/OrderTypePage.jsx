import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { restaurantInfo } from '../restaurantMock';

const OrderTypePage = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState('pickup'); // 'delivery' or 'pickup'
  const [selectedOutlet, setSelectedOutlet] = useState(restaurantInfo.outlets[0].id);

  const handleProceed = (orderMode) => {
    // Store order preferences
    localStorage.setItem('orderType', orderType);
    localStorage.setItem('selectedOutlet', selectedOutlet);
    localStorage.setItem('orderMode', orderMode); // 'now' or 'later'
    
    if (orderType === 'delivery') {
      // Redirect to Zomato for delivery
      window.open(restaurantInfo.deliveryPartners.zomato, '_blank');
    } else {
      // Navigate to menu page
      navigate('/menu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4 text-center">
          <img 
            src={restaurantInfo.logo} 
            alt={restaurantInfo.name}
            className="h-20 mx-auto mb-2 object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <h1 className="text-3xl font-bold text-gray-800">{restaurantInfo.name}</h1>
          <p className="text-gray-600 mt-1">{restaurantInfo.tagline}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Order Type Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Order Type</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Delivery Option */}
            <button
              onClick={() => setOrderType('delivery')}
              className={`p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-3 ${
                orderType === 'delivery'
                  ? 'border-[#579c2c] bg-[#579c2c]/5'
                  : 'border-gray-300 hover:border-[#579c2c]/50'
              }`}
            >
              <Truck size={48} className={orderType === 'delivery' ? 'text-[#579c2c]' : 'text-gray-400'} />
              <span className={`text-lg font-semibold ${orderType === 'delivery' ? 'text-[#579c2c]' : 'text-gray-700'}`}>
                Delivery
              </span>
            </button>

            {/* Pickup Option */}
            <button
              onClick={() => setOrderType('pickup')}
              className={`p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-3 ${
                orderType === 'pickup'
                  ? 'border-[#579c2c] bg-[#579c2c]/5'
                  : 'border-gray-300 hover:border-[#579c2c]/50'
              }`}
            >
              <Package size={48} className={orderType === 'pickup' ? 'text-[#579c2c]' : 'text-gray-400'} />
              <span className={`text-lg font-semibold ${orderType === 'pickup' ? 'text-[#579c2c]' : 'text-gray-700'}`}>
                Pickup
              </span>
            </button>
          </div>
        </div>

        {/* Outlet Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Outlet</h2>
          <div className="space-y-3">
            {restaurantInfo.outlets.map((outlet) => (
              <button
                key={outlet.id}
                onClick={() => setSelectedOutlet(outlet.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  selectedOutlet === outlet.id
                    ? 'border-[#579c2c] bg-[#579c2c]/5'
                    : 'border-gray-300 hover:border-[#579c2c]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${selectedOutlet === outlet.id ? 'text-[#579c2c]' : 'text-gray-800'}`}>
                      {outlet.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{outlet.address}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      <span className="font-medium">Hours:</span> {outlet.openingHours}
                    </p>
                  </div>
                  {selectedOutlet === outlet.id && (
                    <div className="ml-4">
                      <div className="w-6 h-6 bg-[#579c2c] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleProceed('later')}
            size="lg"
            className="bg-[#579c2c]/80 hover:bg-[#579c2c]/90 text-white py-8 text-lg"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Order for Later</span>
            </div>
          </Button>

          <Button
            onClick={() => handleProceed('now')}
            size="lg"
            className="bg-[#579c2c] hover:bg-[#579c2c]/90 text-white py-8 text-lg"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Order Now</span>
            </div>
          </Button>
        </div>

        {orderType === 'delivery' && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm text-center">
              <strong>Note:</strong> For delivery orders, you'll be redirected to Zomato
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTypePage;
