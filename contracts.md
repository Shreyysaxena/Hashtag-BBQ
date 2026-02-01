# Ritu's Cafe - Frontend-Backend Integration Contracts

## Current Implementation Status
**Frontend**: ✅ Complete (Mock Data)
**Backend**: ⏳ Not Implemented Yet

---

## Mock Data Structure (Frontend Only)

### Location: `/app/frontend/src/mock.js`

Currently, all data is stored in `mock.js` and reservations are saved to browser `localStorage`.

---

## Future Backend Integration Plan

### 1. Database Schema (MongoDB)

#### Reservations Collection
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  date: String (ISO Date),
  time: String,
  guests: String,
  createdAt: Date,
  status: String (default: "pending") // pending, confirmed, cancelled
}
```

#### Menu Items Collection (Optional - for dynamic menu)
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: String,
  category: String, // coffee, breakfast, desserts
  image: String (URL),
  bestseller: Boolean,
  available: Boolean
}
```

#### Testimonials Collection (Optional - for admin to manage)
```javascript
{
  _id: ObjectId,
  name: String,
  rating: Number,
  text: String,
  date: String,
  approved: Boolean
}
```

---

## API Endpoints to Implement

### Reservation APIs

#### POST /api/reservations
**Purpose**: Create a new table reservation
**Request Body**:
```json
{
  "name": "string",
  "phone": "string",
  "date": "string (YYYY-MM-DD)",
  "time": "string (HH:MM)",
  "guests": "string"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Reservation created successfully",
  "reservation": {
    "id": "string",
    "name": "string",
    "phone": "string",
    "date": "string",
    "time": "string",
    "guests": "string",
    "createdAt": "timestamp"
  }
}
```

#### GET /api/reservations
**Purpose**: Get all reservations (for admin panel)
**Response**:
```json
{
  "success": true,
  "reservations": [...]
}
```

#### GET /api/reservations/:id
**Purpose**: Get a specific reservation
**Response**:
```json
{
  "success": true,
  "reservation": {...}
}
```

---

## Frontend Changes Required for Backend Integration

### 1. Update `/app/frontend/src/pages/LandingPage.jsx`

#### Current Implementation (Lines 24-41):
```javascript
const handleReservation = (e) => {
  e.preventDefault();
  // Store in browser localStorage
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  const newReservation = {
    ...reservationForm,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  reservations.push(newReservation);
  localStorage.setItem('reservations', JSON.stringify(reservations));
  
  toast.success('Table Reserved Successfully!', {
    description: `We've reserved a table for ${reservationForm.guests} on ${reservationForm.date} at ${reservationForm.time}`
  });
  
  setReservationForm({...});
};
```

#### Future Backend Integration:
```javascript
const handleReservation = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post(`${API}/reservations`, reservationForm);
    
    if (response.data.success) {
      toast.success('Table Reserved Successfully!', {
        description: `We've reserved a table for ${reservationForm.guests} on ${reservationForm.date} at ${reservationForm.time}`
      });
      
      setReservationForm({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: '2'
      });
    }
  } catch (error) {
    toast.error('Reservation Failed', {
      description: error.response?.data?.message || 'Please try again later'
    });
  }
};
```

### 2. Optional: Dynamic Menu Loading

Instead of importing from `mock.js`, fetch menu items from backend:

```javascript
useEffect(() => {
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${API}/menu`);
      setMenuItems(response.data.menu);
    } catch (error) {
      console.error('Failed to load menu:', error);
    }
  };
  
  fetchMenuItems();
}, []);
```

---

## Backend Implementation Checklist

When implementing backend later:

### Phase 1: Reservation System
- [ ] Create `/app/backend/models/reservation.py` - Pydantic model for reservations
- [ ] Add reservation endpoints to `/app/backend/server.py`
- [ ] Update frontend `handleReservation` function to call API
- [ ] Test reservation flow end-to-end
- [ ] Add email notifications (optional)

### Phase 2: Dynamic Menu (Optional)
- [ ] Create `/app/backend/models/menu.py` - Menu item model
- [ ] Add CRUD endpoints for menu management
- [ ] Create admin panel to manage menu items
- [ ] Update frontend to fetch menu from API

### Phase 3: Admin Dashboard (Optional)
- [ ] Create admin authentication
- [ ] Build admin panel to view/manage reservations
- [ ] Add ability to confirm/cancel reservations
- [ ] Export reservations to CSV

---

## Current Mock Data Reference

### Reservation Form Fields:
- `name` (string, required)
- `phone` (string, required)
- `date` (string, required)
- `time` (string, required)
- `guests` (string, required, default: "2")

### Menu Categories:
- `coffee` - Coffee & Beverages (5 items)
- `breakfast` - Breakfast & Brunch (5 items)
- `desserts` - Snacks & Desserts (5 items)

### Static Data (No backend needed):
- Team members (5 people)
- Testimonials (4 reviews)
- Gallery images (8 images)
- Cafe info (address, phone, hours, social links)
- Owner story

---

## Notes for Future Developer

1. **Easy Integration**: Frontend is already structured for backend. Simply replace localStorage with API calls.

2. **Error Handling**: Add proper error handling in frontend for API failures.

3. **Loading States**: Consider adding loading spinners during API calls.

4. **Validation**: Backend should validate:
   - Phone number format
   - Date is not in the past
   - Time is within operating hours
   - Prevent duplicate bookings

5. **Email Notifications**: Consider sending confirmation emails to customers after reservation.

6. **SMS Integration**: Optional - Send SMS confirmations via Twilio.

7. **Admin Panel**: Build separate admin interface to manage reservations.

---

## Quick Backend Start Guide

When ready to implement backend:

1. Create models:
```bash
touch /app/backend/models/reservation.py
```

2. Add endpoints to server.py:
```python
@api_router.post("/reservations")
async def create_reservation(reservation: ReservationCreate):
    # Implementation here
    pass
```

3. Update frontend:
```javascript
// Replace localStorage with API call
const response = await axios.post(`${API}/reservations`, reservationForm);
```

4. Test with curl:
```bash
curl -X POST http://localhost:8001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"9876543210","date":"2024-12-25","time":"19:00","guests":"2"}'
```

---

**Last Updated**: January 24, 2026
**Status**: Frontend Complete, Backend Ready for Integration
