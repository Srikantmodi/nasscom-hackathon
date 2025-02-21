import React, { useState, useEffect } from 'react';
import { Pizza, Coffee, CupSoda, Salad, Merge as Burger, UtensilsCrossed, IceCream, 
         Facebook, Instagram, Twitter, Star, Clock, MapPin, Phone, Mail } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openDropdown, setOpenDropdown] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [specialOffer, setSpecialOffer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSpecialOffer(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const categories = {
    snacks: ['French Fries', 'Onion Rings', 'Chicken Wings', 'Garlic Bread', 'Mozzarella Sticks'],
    beverages: ['Cola', 'Lemonade', 'Iced Tea', 'Mineral Water', 'Smoothies', 'Milkshakes'],
    coffee: ['Espresso', 'Cappuccino', 'Latte', 'Americano', 'Mocha', 'Cold Brew'],
    food: ['Pizza', 'Burger', 'Pasta', 'Salad', 'Sandwiches', 'Wraps']
  };

  const handleDropdown = (category: string) => {
    setOpenDropdown(openDropdown === category ? '' : category);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() < 22 && now.getHours() >= 10 ? 'Open Now' : 'Closed';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-yellow-500 to-pink-500">
      {/* Special Offer Modal */}
      {specialOffer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl gradient-border max-w-md mx-4">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4 neon-text">🍕 Special Offer!</h3>
            <p className="text-white mb-6">Get 20% off on your first order when you download our app!</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setSpecialOffer(false)}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-2 rounded-full"
              >
                Get Offer
              </button>
              <button 
                onClick={() => setSpecialOffer(false)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black/40 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Pizza className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold text-yellow-300 neon-text">NeonPizza</span>
          </div>
          <div className="flex gap-6">
            {Object.keys(categories).map((category) => (
              <div key={category} className="relative">
                <button
                  onClick={() => handleDropdown(category)}
                  className="text-white hover:text-yellow-300 capitalize flex items-center gap-2 transition-colors"
                >
                  {category}
                  <span className={`transition-transform duration-300 ${openDropdown === category ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openDropdown === category && (
                  <div className="absolute top-full mt-2 w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-xl py-2 gradient-border">
                    {categories[category as keyof typeof categories].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-white hover:bg-white/20 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 px-4 py-2 rounded-full font-medium text-white transition-all hover-glow">
            Download App
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative h-screen mb-16 flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2000"
            alt="Pizza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-yellow-900/70"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="text-white max-w-2xl">
            <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 neon-text">
              Neon Pizza Experience
            </h1>
            <p className="text-2xl mb-8 text-gray-200">Enter a world of flavor in our neon-lit paradise</p>
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 px-8 py-3 rounded-full font-medium text-lg text-white hover-glow">
                Order Now
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded-full font-medium text-lg text-white backdrop-blur-sm transition-all">
                View Menu
              </button>
            </div>
            <div className="mt-12 flex gap-8">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" />
                <span>4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-orange-400" />
                <span>{getCurrentTime()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-yellow-400" />
                <span>Multiple Locations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {['all', 'snacks', 'beverages', 'coffee', 'food'].map((category) => (
            <label key={category} className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full cursor-pointer hover:bg-white/20 transition-all gradient-border">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-white capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Menu Categories */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-300 neon-text">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <Coffee className="w-8 h-8" />, 
              name: 'Coffee', 
              price: '$3.99', 
              category: 'coffee', 
              description: 'Premium roasted beans',
              image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400'
            },
            { 
              icon: <Pizza className="w-8 h-8" />, 
              name: 'Pizza', 
              price: '$12.99', 
              category: 'food', 
              description: 'Fresh ingredients',
              image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400'
            },
            { 
              icon: <Burger className="w-8 h-8" />, 
              name: 'Burger', 
              price: '$8.99', 
              category: 'food', 
              description: 'Juicy patties',
              image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400'
            },
            { 
              icon: <UtensilsCrossed className="w-8 h-8" />, 
              name: 'Pasta', 
              price: '$10.99', 
              category: 'food', 
              description: 'Homemade sauce',
              image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400'
            },
            { 
              icon: <CupSoda className="w-8 h-8" />, 
              name: 'Soda', 
              price: '$2.99', 
              category: 'beverages', 
              description: 'Ice cold drinks',
              image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=400'
            },
            { 
              icon: <Salad className="w-8 h-8" />, 
              name: 'Salads', 
              price: '$7.99', 
              category: 'food', 
              description: 'Garden fresh',
              image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400'
            },
            { 
              icon: <IceCream className="w-8 h-8" />, 
              name: 'Ice Cream', 
              price: '$5.99', 
              category: 'snacks', 
              description: 'Creamy delight',
              image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=400'
            },
            { 
              icon: <UtensilsCrossed className="w-8 h-8" />, 
              name: 'Fries', 
              price: '$4.99', 
              category: 'snacks', 
              description: 'Crispy golden',
              image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400'
            },
          ]
          .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
          .map((item, index) => (
            <div key={index} className="menu-card gradient-border overflow-hidden">
              <div className="relative h-48 mb-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-br from-orange-500 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {React.cloneElement(item.icon, { className: 'w-8 h-8 text-white' })}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                <p className="text-yellow-300 mb-4">From {item.price}</p>
                <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-4 py-2 rounded-full w-full transition-all hover-glow">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-black/20 backdrop-blur-md py-16 mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-300 neon-text">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                rating: 5,
                comment: "Best pizza I've ever had! The crust is perfect and toppings are always fresh."
              },
              {
                name: "Sarah Johnson",
                rating: 4,
                comment: "Great service and delicious food. The new mobile app makes ordering so easy!"
              },
              {
                name: "Mike Wilson",
                rating: 5,
                comment: "Amazing variety and quality. Their specialty pizzas are out of this world!"
              }
            ].map((review, index) => (
              <div key={index} className="gradient-border p-6 hover-glow transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">{review.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-300 neon-text">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="gradient-border p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <MapPin className="text-orange-400" />
                <span>123 Pizza Street, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Phone className="text-orange-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Mail className="text-orange-400" />
                <span>contact@neonpizza.com</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Clock className="text-orange-400" />
                <span>Mon-Sun: 10:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
          <div className="gradient-border p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              ></textarea>
              <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-2 rounded-full w-full hover-glow">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">About Us</h3>
              <p className="text-gray-300">Serving delicious pizzas since 1995. Quality ingredients, exceptional taste.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Menu</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Locations</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  123 Pizza Street
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@neonpizza.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">Follow Us</h3>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-300">
            <p>© 2025 NeonPizza. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;