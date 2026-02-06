// Mock data for Hashtag BBQ Restaurant

export const restaurantInfo = {
  name: "Hashtag BBQ",
  tagline: "Authentic BBQ & Grills",
  logo: "https://customer-assets.emergentagent.com/job_trc-cafe/artifacts/nlk4e25b_ChatGPT%20Image%20Feb%206%2C%202026%2C%2003_46_52%20PM.png",
  primaryColor: "#579c2c",
  outlets: [
    {
      id: 1,
      name: "Hashtag BBQ (Chandkheda)",
      address: "Shop 12, Chandkheda Circle, Ahmedabad - 382424, Gujarat",
      phone: "+91-9876543210",
      openingHours: "11:00 AM - 11:00 PM",
      location: {
        lat: 23.1125,
        lng: 72.6156
      }
    }
  ],
  zomatoUrl: "https://www.zomato.com", // Placeholder - will be updated
  deliveryPartners: {
    zomato: "https://www.zomato.com"
  }
};

export const menuCategories = [
  { id: 'veg-starters', name: 'Veg Starters', icon: '🥗' },
  { id: 'non-veg-starters', name: 'Non-Veg Starters', icon: '🍗' },
  { id: 'bbq-platters', name: 'BBQ Platters', icon: '🍖' },
  { id: 'tandoori-specials', name: 'Tandoori Specials', icon: '🔥' },
  { id: 'breads', name: 'Breads', icon: '🫓' },
  { id: 'rice-biryani', name: 'Rice & Biryani', icon: '🍚' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍨' }
];

export const menuItems = {
  'veg-starters': [
    {
      id: 'vs1',
      name: 'Paneer Tikka',
      description: 'Cottage cheese cubes marinated in spices and grilled to perfection',
      price: 240,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
      veg: true,
      bestseller: true,
      customizable: true
    },
    {
      id: 'vs2',
      name: 'Mushroom Tikka',
      description: 'Fresh mushrooms marinated in tandoori spices',
      price: 220,
      image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400',
      veg: true,
      customizable: true
    },
    {
      id: 'vs3',
      name: 'Veg Seekh Kebab',
      description: 'Minced vegetables with aromatic spices shaped and grilled',
      price: 200,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
      veg: true,
      customizable: false
    },
    {
      id: 'vs4',
      name: 'Hara Bhara Kebab',
      description: 'Green vegetable patties with spinach and peas',
      price: 210,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      veg: true,
      bestseller: false,
      customizable: true
    }
  ],
  'non-veg-starters': [
    {
      id: 'nvs1',
      name: 'Chicken Tikka',
      description: 'Boneless chicken pieces marinated and char-grilled',
      price: 280,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
      veg: false,
      bestseller: true,
      customizable: true
    },
    {
      id: 'nvs2',
      name: 'Chicken Seekh Kebab',
      description: 'Minced chicken with spices grilled on skewers',
      price: 260,
      image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',
      veg: false,
      customizable: true
    },
    {
      id: 'nvs3',
      name: 'Chicken Wings',
      description: 'Spicy grilled chicken wings with BBQ sauce',
      price: 290,
      image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400',
      veg: false,
      bestseller: true,
      customizable: false
    },
    {
      id: 'nvs4',
      name: 'Mutton Seekh Kebab',
      description: 'Minced mutton with aromatic spices',
      price: 320,
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
      veg: false,
      customizable: true
    },
    {
      id: 'nvs5',
      name: 'Fish Tikka',
      description: 'Boneless fish marinated in tandoori masala',
      price: 340,
      image: 'https://images.unsplash.com/photo-1580959375944-2c89eb3a33d5?w=400',
      veg: false,
      customizable: true
    }
  ],
  'bbq-platters': [
    {
      id: 'bbq1',
      name: 'Veg BBQ Platter',
      description: 'Assorted veg kebabs - Paneer tikka, mushroom, seekh kebab',
      price: 380,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      veg: true,
      bestseller: true,
      customizable: false
    },
    {
      id: 'bbq2',
      name: 'Chicken BBQ Platter',
      description: 'Mix of chicken tikka, seekh kebab and wings',
      price: 400,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
      veg: false,
      bestseller: true,
      customizable: false
    },
    {
      id: 'bbq3',
      name: 'Mixed Grill Platter',
      description: 'Combo of chicken and mutton kebabs',
      price: 400,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
      veg: false,
      bestseller: true,
      customizable: false
    }
  ],
  'tandoori-specials': [
    {
      id: 'ts1',
      name: 'Tandoori Chicken (Half)',
      description: 'Classic tandoori chicken marinated overnight',
      price: 280,
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400',
      veg: false,
      bestseller: true,
      customizable: false
    },
    {
      id: 'ts2',
      name: 'Tandoori Paneer',
      description: 'Whole paneer marinated in tandoori spices',
      price: 260,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
      veg: true,
      customizable: true
    },
    {
      id: 'ts3',
      name: 'Tandoori Fish',
      description: 'Pomfret fish marinated in Indian spices',
      price: 380,
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
      veg: false,
      customizable: false
    }
  ],
  'breads': [
    {
      id: 'br1',
      name: 'Butter Naan',
      description: 'Soft tandoori naan brushed with butter',
      price: 50,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      veg: true,
      customizable: false
    },
    {
      id: 'br2',
      name: 'Garlic Naan',
      description: 'Naan topped with garlic and coriander',
      price: 60,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
      veg: true,
      bestseller: true,
      customizable: false
    },
    {
      id: 'br3',
      name: 'Tandoori Roti',
      description: 'Whole wheat bread from tandoor',
      price: 30,
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
      veg: true,
      customizable: false
    },
    {
      id: 'br4',
      name: 'Stuffed Kulcha',
      description: 'Naan stuffed with spiced potatoes',
      price: 70,
      image: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=400',
      veg: true,
      customizable: true
    }
  ],
  'rice-biryani': [
    {
      id: 'rb1',
      name: 'Veg Biryani',
      description: 'Fragrant basmati rice with mixed vegetables',
      price: 220,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
      veg: true,
      bestseller: true,
      customizable: false
    },
    {
      id: 'rb2',
      name: 'Chicken Biryani',
      description: 'Aromatic biryani with tender chicken pieces',
      price: 280,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
      veg: false,
      bestseller: true,
      customizable: false
    },
    {
      id: 'rb3',
      name: 'Mutton Biryani',
      description: 'Rich biryani with succulent mutton',
      price: 340,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
      veg: false,
      bestseller: false,
      customizable: false
    },
    {
      id: 'rb4',
      name: 'Jeera Rice',
      description: 'Basmati rice tempered with cumin',
      price: 150,
      image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400',
      veg: true,
      customizable: false
    }
  ],
  'beverages': [
    {
      id: 'bv1',
      name: 'Fresh Lime Soda',
      description: 'Refreshing lime with soda',
      price: 60,
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400',
      veg: true,
      customizable: true
    },
    {
      id: 'bv2',
      name: 'Masala Chaas',
      description: 'Spiced buttermilk',
      price: 50,
      image: 'https://images.unsplash.com/photo-1587226801073-7a0f30536b20?w=400',
      veg: true,
      customizable: false
    },
    {
      id: 'bv3',
      name: 'Cold Coffee',
      description: 'Chilled coffee with ice cream',
      price: 80,
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
      veg: true,
      customizable: true
    },
    {
      id: 'bv4',
      name: 'Soft Drinks',
      description: 'Coke / Pepsi / Sprite',
      price: 40,
      image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400',
      veg: true,
      customizable: true
    }
  ],
  'desserts': [
    {
      id: 'ds1',
      name: 'Gulab Jamun (2 Pcs)',
      description: 'Traditional Indian sweet in sugar syrup',
      price: 80,
      image: 'https://images.unsplash.com/photo-1571167530149-c6c0e0a775f5?w=400',
      veg: true,
      bestseller: true,
      customizable: false
    },
    {
      id: 'ds2',
      name: 'Rasmalai (2 Pcs)',
      description: 'Soft cottage cheese in sweetened milk',
      price: 90,
      image: 'https://images.unsplash.com/photo-1585759071429-3b0bb19eb310?w=400',
      veg: true,
      customizable: false
    },
    {
      id: 'ds3',
      name: 'Ice Cream',
      description: 'Vanilla / Chocolate / Strawberry',
      price: 70,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
      veg: true,
      customizable: true
    }
  ]
};

// Cart helper functions
export const getCart = () => {
  const cart = localStorage.getItem('hashtagbbq_cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item, quantity = 1, customization = '') => {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    i => i.id === item.id && i.customization === customization
  );
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      ...item,
      quantity,
      customization,
      addedAt: new Date().toISOString()
    });
  }
  
  localStorage.setItem('hashtagbbq_cart', JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (itemId, customization = '') => {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === itemId && item.customization === customization));
  localStorage.setItem('hashtagbbq_cart', JSON.stringify(cart));
  return cart;
};

export const updateCartQuantity = (itemId, customization, quantity) => {
  const cart = getCart();
  const item = cart.find(i => i.id === itemId && i.customization === customization);
  if (item) {
    item.quantity = quantity;
    if (quantity <= 0) {
      return removeFromCart(itemId, customization);
    }
  }
  localStorage.setItem('hashtagbbq_cart', JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('hashtagbbq_cart');
  return [];
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
