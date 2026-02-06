import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { 
  restaurantInfo, 
  menuCategories, 
  menuItems,
  addToCart,
  getCartCount
} from '../restaurantMock';

const MenuPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('veg-starters');
  const [vegFilter, setVegFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    setCartCount(getCartCount());
    toast.success(`${item.name} added to cart!`, {
      duration: 2000
    });
  };

  const getFilteredItems = () => {
    let items = menuItems[selectedCategory] || [];
    
    // Apply veg filter
    if (vegFilter === 'veg') {
      items = items.filter(item => item.veg);
    } else if (vegFilter === 'non-veg') {
      items = items.filter(item => !item.veg);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return items;
  };

  const outlet = restaurantInfo.outlets[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Outlet */}
            <div className="flex items-center space-x-4">
              <img 
                src={restaurantInfo.logo} 
                alt={restaurantInfo.name}
                className="h-12 object-contain cursor-pointer"
                onClick={() => navigate('/')}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div>
                <select
                  className="text-sm font-medium text-gray-700 border border-gray-300 rounded px-2 py-1"
                  defaultValue={outlet.id}
                >
                  <option value={outlet.id}>{outlet.name}</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Pickup Time: 18 Mins</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#579c2c]"
                />
              </div>
            </div>

            {/* Veg/Non-Veg Filter and Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setVegFilter('veg')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    vegFilter === 'veg' ? 'bg-[#579c2c] text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Veg
                </button>
                <button
                  onClick={() => setVegFilter('non-veg')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    vegFilter === 'non-veg' ? 'bg-[#579c2c] text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Non Veg
                </button>
              </div>

              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart size={24} className="text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#579c2c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#579c2c]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar - Categories */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Menu Categories</h2>
            <nav className="space-y-1">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    selectedCategory === category.id
                      ? 'bg-[#579c2c] text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Category Tabs */}
        <div className="md:hidden w-full bg-white border-b border-gray-200 overflow-x-auto">
          <div className="flex space-x-2 p-3">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#579c2c] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Category Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {menuCategories.find(c => c.id === selectedCategory)?.name}
              </h1>
              <div className="h-1 w-24 bg-[#579c2c] mt-2 rounded-full"></div>
            </div>

            {/* Items Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {getFilteredItems().map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex">
                    {/* Item Image */}
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            {/* Veg/Non-Veg Indicator */}
                            <div className={`w-4 h-4 border-2 flex items-center justify-center ${
                              item.veg ? 'border-green-600' : 'border-red-600'
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${
                                item.veg ? 'bg-green-600' : 'bg-red-600'
                              }`}></div>
                            </div>
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                          </div>
                          {item.bestseller && (
                            <Badge className="mt-1 bg-yellow-500">Bestseller</Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-800">
                            ₹{item.price}
                          </p>
                          {item.customizable && (
                            <p className="text-xs text-[#579c2c] font-medium">
                              Customization available
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="bg-[#579c2c] hover:bg-[#579c2c]/90 text-white px-6"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {getFilteredItems().length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Floating Cart Button for Mobile */}
      {cartCount > 0 && (
        <button
          onClick={() => navigate('/cart')}
          className="md:hidden fixed bottom-6 right-6 bg-[#579c2c] text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 z-50"
        >
          <ShoppingCart size={20} />
          <span className="font-bold">{cartCount} Items</span>
        </button>
      )}
    </div>
  );
};

export default MenuPage;
