import React, { useState } from 'react';
import { Phone, Instagram, MapPin, Clock, Mail, Star, ChevronDown, Menu as MenuIcon, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import {
  menuItems,
  testimonials,
  teamMembers,
  galleryImages,
  cafeInfo,
  ownerStory } from
'../mock';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('coffee');
  const [reservationForm, setReservationForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });

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

    setReservationForm({
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: '2'
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cafe-brown/10 !bg-[#FFFFFF]">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center !font-bold !text-lg rounded-lg text-white bg-cafe-brown">TRC

              </div>
              <span className="font-serif text-xl font-bold text-cafe-brown">Ritu's Cafe</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('menu')} className="nav-link">Menu</button>
              <button onClick={() => scrollToSection('story')} className="nav-link">Our Story</button>
              <button onClick={() => scrollToSection('reserve')} className="nav-link">Reserve</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
              <Button onClick={() => scrollToSection('order')} className="bg-cafe-brown hover:bg-cafe-brown/90">Order Now</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-cafe-brown"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen &&
          <div className="md:hidden mt-4 pb-4 space-y-3">
              <button onClick={() => scrollToSection('menu')} className="block w-full text-left py-2 text-cafe-brown">Menu</button>
              <button onClick={() => scrollToSection('story')} className="block w-full text-left py-2 text-cafe-brown">Our Story</button>
              <button onClick={() => scrollToSection('reserve')} className="block w-full text-left py-2 text-cafe-brown">Reserve</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-cafe-brown">Contact</button>
              <Button onClick={() => scrollToSection('order')} className="w-full bg-cafe-brown hover:bg-cafe-brown/90">Order Now</Button>
            </div>
          }
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_trc-cafe/artifacts/9zwrmquw_1.png"
            alt="Ritu's Cafe Interior"
            className="w-full h-full object-cover object-center"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              transform: 'scale(1.1)',
              filter: 'contrast(1.05) brightness(1.02)'
            }} />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="hero-title text-4xl md:text-6xl font-bold text-white mb-4">
            Where Every Sip<br />Feels Like Home
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the warmth of artisanal coffee and handcrafted delights at Bangalore's most beloved neighborhood cafe
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="default" 
              onClick={() => scrollToSection('menu')}
              className="cta-primary px-8 py-5 text-base font-semibold shadow-lg"
            >
              View Menu
            </Button>
            <Button 
              size="default" 
              variant="outline"
              onClick={() => scrollToSection('reserve')}
              className="cta-secondary px-8 py-5 text-base font-semibold bg-white/95 backdrop-blur-sm border-2 border-white text-cafe-brown hover:bg-white hover:scale-105 shadow-lg"
            >
              Reserve a Table
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a href={cafeInfo.orderLinks.phone} className="quick-action-btn shadow-md">
              <Phone size={20} />
              <span className="font-medium">Call Now</span>
            </a>
            <a href={cafeInfo.orderLinks.zomato} target="_blank" rel="noopener noreferrer" className="quick-action-btn shadow-md">
              <span className="font-medium">Order on Zomato</span>
            </a>
            <a href={cafeInfo.orderLinks.swiggy} target="_blank" rel="noopener noreferrer" className="quick-action-btn shadow-md">
              <span className="font-medium">Order on Swiggy</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white" size={32} />
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="story" className="section-padding bg-cafe-cream">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="story-image-wrapper">
              <img
                src={ownerStory.image}
                alt="Owner Ritu"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover" />

            </div>
            <div className="story-content">
              <h2 className="section-title text-3xl md:text-4xl font-bold text-cafe-brown mb-6">
                {ownerStory.title}
              </h2>
              <p className="text-base text-cafe-brown/80 leading-relaxed mb-6">
                {ownerStory.content}
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-1 bg-cafe-brown"></div>
                <span className="text-cafe-brown font-medium">Ritu Malhotra, Founder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-cafe-brown mb-4">
              Signature Menu Highlights
            </h2>
            <p className="text-base text-cafe-brown/70">Handcrafted with love, served with care</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={selectedCategory === 'coffee' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('coffee')}
              className={selectedCategory === 'coffee' ? 'bg-cafe-brown hover:bg-cafe-brown/90' : ''}>

              Coffee & Beverages
            </Button>
            <Button
              variant={selectedCategory === 'breakfast' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('breakfast')}
              className={selectedCategory === 'breakfast' ? 'bg-cafe-brown hover:bg-cafe-brown/90' : ''}>

              Breakfast & Brunch
            </Button>
            <Button
              variant={selectedCategory === 'desserts' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('desserts')}
              className={selectedCategory === 'desserts' ? 'bg-cafe-brown hover:bg-cafe-brown/90' : ''}>

              Snacks & Desserts
            </Button>
          </div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems[selectedCategory].map((item) =>
            <Card key={item.id} className="menu-card overflow-hidden hover:shadow-xl transition-all duration-300">
                {item.image &&
              <div className="relative h-48 overflow-hidden">
                    <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />

                    {item.bestseller &&
                <Badge className="absolute top-4 right-4 bg-cafe-brown">
                        Bestseller
                      </Badge>
                }
                  </div>
              }
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-cafe-brown mb-2">{item.name}</h3>
                  <p className="text-cafe-brown/70 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-cafe-brown">{item.price}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="text-center mt-12">
            <Button size="default" className="bg-cafe-brown hover:bg-cafe-brown/90">
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Order Online Section */}
      <section id="order" className="section-padding bg-cafe-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-cafe-brown mb-4">
              Order Online
            </h2>
            <p className="text-base text-cafe-brown/70">Fast, easy ordering from your favorite delivery apps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="order-card text-center p-8 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => window.open(cafeInfo.orderLinks.zomato, '_blank')}>
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                Z
              </div>
              <h3 className="text-xl font-bold text-cafe-brown mb-2">Zomato</h3>
              <p className="text-cafe-brown/70 mb-4">Order now on Zomato</p>
              <Button className="w-full bg-red-500 hover:bg-red-600">Order Now</Button>
            </Card>

            <Card className="order-card text-center p-8 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => window.open(cafeInfo.orderLinks.swiggy, '_blank')}>
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                S
              </div>
              <h3 className="text-xl font-bold text-cafe-brown mb-2">Swiggy</h3>
              <p className="text-cafe-brown/70 mb-4">Order now on Swiggy</p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">Order Now</Button>
            </Card>

            <Card className="order-card text-center p-8 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = cafeInfo.orderLinks.phone}>
              <div className="w-16 h-16 bg-cafe-brown rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-bold text-cafe-brown mb-2">Call to Order</h3>
              <p className="text-cafe-brown/70 mb-4">Talk to us directly</p>
              <Button className="w-full bg-cafe-brown hover:bg-cafe-brown/90">Call Now</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl md:text-4xl font-bold text-cafe-brown mb-4">
                Reserve Your Table
              </h2>
              <p className="text-base text-cafe-brown/70">Cozy seating & perfect ambiance await you</p>
            </div>

            <Card className="p-8 shadow-xl">
              <form onSubmit={handleReservation} className="space-y-6">
                <div>
                  <label className="block text-cafe-brown font-medium mb-2">Name</label>
                  <Input
                    required
                    value={reservationForm.name}
                    onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                    placeholder="Your name"
                    className="border-cafe-brown/20" />

                </div>

                <div>
                  <label className="block text-cafe-brown font-medium mb-2">Phone Number</label>
                  <Input
                    required
                    type="tel"
                    value={reservationForm.phone}
                    onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="border-cafe-brown/20" />

                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cafe-brown font-medium mb-2">Date</label>
                    <Input
                      required
                      type="date"
                      value={reservationForm.date}
                      onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                      className="border-cafe-brown/20" />

                  </div>
                  <div>
                    <label className="block text-cafe-brown font-medium mb-2">Time</label>
                    <Input
                      required
                      type="time"
                      value={reservationForm.time}
                      onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                      className="border-cafe-brown/20" />

                  </div>
                </div>

                <div>
                  <label className="block text-cafe-brown font-medium mb-2">Number of Guests</label>
                  <select
                    required
                    value={reservationForm.guests}
                    onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                    className="w-full px-3 py-2 border border-cafe-brown/20 rounded-md">

                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6+ Guests</option>
                  </select>
                </div>

                <Button type="submit" className="w-full bg-cafe-brown hover:bg-cafe-brown/90 py-5">
                  Reserve Your Table
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-cafe-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-cafe-brown mb-4">
              Meet Our Team
            </h2>
            <p className="text-base text-cafe-brown/70">Friendly faces serving with heart and passion</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member) =>
            <Card key={member.id} className="team-card text-center p-6 hover:shadow-xl transition-all duration-300">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover" />

                </div>
                <h3 className="text-lg font-bold text-cafe-brown mb-1">{member.name}</h3>
                <p className="text-sm text-cafe-brown/70 font-medium mb-3">{member.role}</p>
                <p className="text-xs text-cafe-brown/60">{member.bio}</p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-cafe-brown mb-4">
              Ambience & Gallery
            </h2>
            <p className="text-base text-cafe-brown/70">Moments worth sharing</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image) =>
            <div key={image.id} className="gallery-item aspect-square overflow-hidden rounded-lg cursor-pointer hover:shadow-xl transition-all duration-300">
                <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />

              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-cafe-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-cafe-brown mb-4">
              What Our Customers Say
            </h2>
            <p className="text-base text-cafe-brown/70">Loved by the community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) =>
            <Card key={testimonial.id} className="testimonial-card p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) =>
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                )}
                </div>
                <p className="text-cafe-brown/80 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t border-cafe-brown/10 pt-4">
                  <p className="font-bold text-cafe-brown">{testimonial.name}</p>
                  <p className="text-sm text-cafe-brown/60">{testimonial.date}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-cafe-brown mb-4">
              Visit Us
            </h2>
            <p className="text-base text-cafe-brown/70">We'd love to see you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <div className="map-container rounded-2xl overflow-hidden shadow-xl h-[400px] bg-cafe-cream/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.653046253897!2d77.6271074!3d12.9351929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144ed898fc47%3A0x1681f38e8c84e877!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Cafe Location">
              </iframe>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cafe-brown rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-cafe-brown mb-2">Address</h3>
                    <p className="text-cafe-brown/70">{cafeInfo.address}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cafe-brown rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-cafe-brown mb-2">Phone</h3>
                    <a href={`tel:${cafeInfo.phone}`} className="text-cafe-brown/70 hover:text-cafe-brown">
                      {cafeInfo.phone}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cafe-brown rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-cafe-brown mb-2">Opening Hours</h3>
                    <p className="text-cafe-brown/70">Mon-Fri: {cafeInfo.hours.weekdays}</p>
                    <p className="text-cafe-brown/70">Sat-Sun: {cafeInfo.hours.weekends}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cafe-brown rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-cafe-brown mb-2">Email</h3>
                    <a href={`mailto:${cafeInfo.email}`} className="text-cafe-brown/70 hover:text-cafe-brown">
                      {cafeInfo.email}
                    </a>
                  </div>
                </div>
              </Card>

              <div className="flex space-x-4">
                <a
                  href={cafeInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300">

                  <Instagram size={24} />
                </a>
                <a
                  href={cafeInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300">

                  <Phone size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cafe-brown text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-cafe-brown font-bold text-lg">
                  R
                </div>
                <span className="font-serif text-xl font-bold">Ritu's Cafe</span>
              </div>
              <p className="text-white/70">{cafeInfo.tagline}</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('menu')} className="text-white/70 hover:text-white">Menu</button></li>
                <li><button onClick={() => scrollToSection('order')} className="text-white/70 hover:text-white">Order</button></li>
                <li><button onClick={() => scrollToSection('reserve')} className="text-white/70 hover:text-white">Reserve</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-white/70 hover:text-white">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Order Online</h4>
              <ul className="space-y-2">
                <li><a href={cafeInfo.orderLinks.zomato} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">Zomato</a></li>
                <li><a href={cafeInfo.orderLinks.swiggy} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">Swiggy</a></li>
                <li><a href={cafeInfo.orderLinks.phone} className="text-white/70 hover:text-white">Call to Order</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href={cafeInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <Instagram size={24} />
                </a>
                <a href={cafeInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <Phone size={24} />
                </a>
              </div>
              <p className="text-white/70 text-sm">{cafeInfo.address}</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/70">
              © 2024 Ritu's Cafe by TRC. All rights reserved. Made with ❤️ in Bangalore.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default LandingPage;