# Hashtag BBQ - Table Reservation Backend Integration Contracts

## Current Implementation Status
**Frontend**: ✅ Complete (Mock Data - localStorage)
**Backend**: ⏳ Not Implemented Yet

---

## Table Reservation Flow

### Frontend Implementation
Location: `/app/frontend/src/pages/OrderTypePage.jsx`

When user clicks "Reserve a Table" button:
```javascript
const handleReserveTable = () => {
  // Store reservation intent for backend integration later
  localStorage.setItem('orderType', 'reservation');
  localStorage.setItem('selectedOutlet', selectedOutlet);
  localStorage.setItem('reservationDate', new Date().toISOString());
  
  // Navigate to menu page (or reservation page in future)
  navigate('/menu');
};
```

---

## Future Backend Integration Plan

### 1. Database Schema (MongoDB)

#### Table Reservations Collection
```javascript
{
  _id: ObjectId,
  customerName: String,
  customerPhone: String,
  customerEmail: String (optional),
  outletId: String,
  reservationDate: Date,
  reservationTime: String, // "18:30", "20:00" etc
  numberOfGuests: Number,
  specialRequests: String (optional),
  status: String, // "pending", "confirmed", "cancelled", "completed"
  createdAt: Date,
  updatedAt: Date
}
```

#### Outlets Collection (Already defined in mock)
```javascript
{
  _id: ObjectId,
  name: String,
  address: String,
  phone: String,
  openingHours: String,
  location: {
    lat: Number,
    lng: Number
  },
  capacity: Number, // Max tables/seats
  availableSlots: Array // Time slots available for reservation
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
  "customerName": "string",
  "customerPhone": "string",
  "customerEmail": "string (optional)",
  "outletId": "string",
  "reservationDate": "string (YYYY-MM-DD)",
  "reservationTime": "string (HH:MM)",
  "numberOfGuests": "number",
  "specialRequests": "string (optional)"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Table reserved successfully",
  "reservation": {
    "id": "string",
    "confirmationCode": "string",
    "customerName": "string",
    "outletName": "string",
    "reservationDate": "string",
    "reservationTime": "string",
    "numberOfGuests": "number",
    "status": "pending"
  }
}
```

#### GET /api/reservations
**Purpose**: Get all reservations (for admin/management)
**Query Parameters**: 
- `outletId` (optional)
- `date` (optional)
- `status` (optional)

**Response**:
```json
{
  "success": true,
  "reservations": [...]
}
```

#### GET /api/reservations/:id
**Purpose**: Get a specific reservation by ID or confirmation code
**Response**:
```json
{
  "success": true,
  "reservation": {...}
}
```

#### PUT /api/reservations/:id
**Purpose**: Update reservation status (confirm/cancel)
**Request Body**:
```json
{
  "status": "confirmed" | "cancelled"
}
```

#### GET /api/reservations/available-slots
**Purpose**: Get available time slots for a specific date and outlet
**Query Parameters**:
- `outletId` (required)
- `date` (required)
- `guests` (required)

**Response**:
```json
{
  "success": true,
  "availableSlots": ["18:00", "18:30", "19:00", "19:30", "20:00"]
}
```

---

## Frontend Changes Required for Backend Integration

### 1. Create Reservation Form Component

Create `/app/frontend/src/pages/ReservationPage.jsx`:

```javascript
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    reservationDate: '',
    reservationTime: '',
    numberOfGuests: 2,
    specialRequests: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const outletId = localStorage.getItem('selectedOutlet');
      const response = await axios.post(`${API}/reservations`, {
        ...formData,
        outletId
      });
      
      if (response.data.success) {
        toast.success('Table Reserved Successfully!', {
          description: `Confirmation Code: ${response.data.reservation.confirmationCode}`
        });
        
        // Navigate to confirmation page or menu
        navigate('/menu');
      }
    } catch (error) {
      toast.error('Reservation Failed', {
        description: error.response?.data?.message || 'Please try again later'
      });
    }
  };

  return (
    // Reservation form UI here
  );
};
```

### 2. Update OrderTypePage Navigation

Change `handleReserveTable` to navigate to reservation form:

```javascript
const handleReserveTable = () => {
  localStorage.setItem('orderType', 'reservation');
  localStorage.setItem('selectedOutlet', selectedOutlet);
  navigate('/reservation'); // Navigate to reservation form page
};
```

### 3. Add Route in App.js

```javascript
<Route path="/reservation" element={<ReservationPage />} />
```

---

## Backend Implementation Checklist

### Phase 1: Basic Reservation System
- [ ] Create `/app/backend/models/reservation.py` - Pydantic model
- [ ] Create `/app/backend/models/outlet.py` - Outlet model with capacity
- [ ] Add reservation endpoints to `/app/backend/server.py`
- [ ] Implement availability checking logic
- [ ] Add validation for:
  - Date is not in the past
  - Time is within operating hours
  - Outlet has capacity for requested guests
  - No double booking on same table/time

### Phase 2: Confirmation & Notifications
- [ ] Generate unique confirmation codes
- [ ] Send SMS confirmation (Twilio integration)
- [ ] Send email confirmation (optional)
- [ ] Add reservation reminder system

### Phase 3: Admin Panel
- [ ] Create admin dashboard to view/manage reservations
- [ ] Add ability to confirm/cancel reservations
- [ ] View daily reservation schedule
- [ ] Export reservations to CSV
- [ ] Real-time availability calendar

### Phase 4: Advanced Features
- [ ] Automatic table assignment
- [ ] Waitlist management
- [ ] Customer history tracking
- [ ] Review/rating system post-visit
- [ ] Integration with POS system

---

## Validation Rules

### Backend Validations:
1. **Phone Number**: 10 digits, Indian format (+91)
2. **Date**: Must be today or future date
3. **Time**: Must be within outlet operating hours (11:00 AM - 11:00 PM)
4. **Guests**: Min 1, Max based on outlet capacity
5. **Advance Booking**: Max 30 days in advance
6. **Minimum Notice**: At least 1 hour before reservation time

### Business Logic:
- Each table slot is 30 minutes
- Maximum 2 hours per reservation
- Automatic cancellation if not confirmed within 24 hours
- Send reminder 2 hours before reservation time

---

## Sample Backend Implementation

```python
# /app/backend/models/reservation.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import uuid

class ReservationCreate(BaseModel):
    customerName: str = Field(..., min_length=2, max_length=100)
    customerPhone: str = Field(..., regex="^[0-9]{10}$")
    customerEmail: Optional[str] = None
    outletId: str
    reservationDate: str  # YYYY-MM-DD
    reservationTime: str  # HH:MM
    numberOfGuests: int = Field(..., ge=1, le=20)
    specialRequests: Optional[str] = None

class Reservation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    confirmationCode: str = Field(default_factory=lambda: str(uuid.uuid4())[:8].upper())
    customerName: str
    customerPhone: str
    customerEmail: Optional[str]
    outletId: str
    reservationDate: str
    reservationTime: str
    numberOfGuests: int
    specialRequests: Optional[str]
    status: str = "pending"
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
```

```python
# /app/backend/server.py - Add these endpoints

@api_router.post("/reservations", response_model=dict)
async def create_reservation(reservation: ReservationCreate):
    # Validate date and time
    # Check availability
    # Create reservation
    reservation_obj = Reservation(**reservation.dict())
    result = await db.reservations.insert_one(reservation_obj.dict())
    
    return {
        "success": True,
        "message": "Table reserved successfully",
        "reservation": reservation_obj.dict()
    }

@api_router.get("/reservations", response_model=dict)
async def get_reservations(
    outletId: Optional[str] = None,
    date: Optional[str] = None,
    status: Optional[str] = None
):
    query = {}
    if outletId:
        query["outletId"] = outletId
    if date:
        query["reservationDate"] = date
    if status:
        query["status"] = status
        
    reservations = await db.reservations.find(query).to_list(1000)
    return {
        "success": True,
        "reservations": reservations
    }
```

---

## Testing Strategy

### Manual Testing:
1. Test reservation creation with valid data
2. Test validation errors (past date, invalid phone, etc.)
3. Test availability checking
4. Test double booking prevention
5. Test status updates (confirm/cancel)

### Automated Testing:
```bash
# Test reservation creation
curl -X POST http://localhost:8001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "customerPhone": "9876543210",
    "outletId": "1",
    "reservationDate": "2026-02-15",
    "reservationTime": "19:00",
    "numberOfGuests": 4
  }'
```

---

## Notes for Future Developer

1. **Current State**: "Reserve a Table" button stores intent in localStorage and navigates to menu
2. **Next Step**: Create dedicated reservation form page with date/time picker
3. **Integration**: Replace localStorage with API calls to backend
4. **Notifications**: Consider implementing SMS/Email confirmations
5. **Admin Access**: Build separate admin panel for restaurant staff
6. **Analytics**: Track reservation patterns, peak times, cancellation rates

---

**Last Updated**: February 6, 2026
**Status**: Frontend Button Ready, Backend Pending Implementation
**Priority**: Medium (Can be implemented when ready to launch reservation feature)
