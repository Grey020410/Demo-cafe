/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Coffee, 
  Menu as MenuIcon, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Wifi, 
  Instagram, 
  Facebook, 
  Twitter, 
  Moon, 
  Sun,
  Star,
  ChevronRight,
  Utensils
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface MenuItem {
  name: string;
  price: number;
  description?: string;
  image?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const MENU_DATA: MenuCategory[] = [
  {
    title: "Coffee",
    items: [
      { name: "Espresso", price: 120, description: "Rich and bold single shot." },
      { name: "Cappuccino", price: 180, description: "Espresso with steamed milk foam." },
      { name: "Cold Coffee", price: 200, description: "Creamy iced perfection with a hint of vanilla." },
    ]
  },
  {
    title: "Beverages",
    items: [
      { name: "Iced Tea", price: 150, description: "Refreshing lemon and peach infused tea." },
      { name: "Hot Chocolate", price: 180, description: "Rich, velvety cocoa with marshmallows." },
    ]
  },
  {
    title: "Snacks",
    items: [
      { name: "Chocolate Brownie", price: 120, description: "Warm, fudgy, and heavenly." },
      { name: "Veg Sandwich", price: 100, description: "Fresh farm veggies with herb butter." },
      { name: "Pasta", price: 220, description: "Creamy alfredo or tangy red sauce." },
    ]
  }
];

const REVIEWS = [
  { name: "Anish K.", rating: 5, text: "Best place in Kalamboli for a quick work session. The Cold Coffee is amazing!" },
  { name: "Priya S.", rating: 5, text: "Super aesthetic! Perfect for my Instagram feed. Love the vibe." },
  { name: "Rohit M.", rating: 4, text: "Affordable and cozy. The brownie is a must-try!" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Coffee");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-brand-black text-brand-text">
      
      {/* --- Navbar --- */}
      <nav id="nav" className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-brand-border bg-brand-black/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-brand-black"><Coffee size={24} /></span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight uppercase">Bean Haven <span className="text-brand-accent">Café</span></h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-12">
              {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="header-nav-link"
                >
                  {item}
                </button>
              ))}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 bg-brand-card rounded-full border border-brand-border hover:border-brand-accent transition-all"
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button className="action-button">
                  Order Online
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-black border-b border-brand-border"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-3 py-4 text-lg font-medium border-b border-brand-border"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Home / Hero Section --- */}
      <header id="home" className="relative pt-20 min-h-screen flex items-center overflow-hidden px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Section: Hero Text */}
          <div className="lg:col-span-5 relative">
             <div className="absolute -top-12 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-accent opacity-50 hidden md:block"></div>
             <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl md:text-8xl font-light leading-[0.9] mb-8 italic font-serif">
                Your Daily <br/>
                <span className="font-black not-italic text-brand-accent-light">Escape,</span><br/>
                Brewed Fresh.
              </h2>
              <p className="text-sm leading-relaxed opacity-70 mb-10 max-w-sm">
                Started in 2022, Bean Haven is a cozy pocket of Kalamboli. We craft more than just coffee; we build spaces for study sessions and heart-to-hearts.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <span className="px-3 py-1 border border-brand-accent text-brand-accent text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">
                  Free High-Speed WiFi
                </span>
                <span className="px-3 py-1 border border-brand-border text-stone-400 text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">
                  Open Daily: 8AM - 11PM
                </span>
              </div>

              <div className="flex items-center gap-6">
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="action-button px-10 py-4 text-sm"
                >
                  View Menu
                </button>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="text-xs uppercase tracking-[0.2em] font-bold border-b border-brand-accent pb-1 hover:text-brand-accent transition-all"
                >
                  Explore Gallery
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Section: Visual Grid */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 h-[600px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="col-span-8 h-full rounded-2xl overflow-hidden relative group"
            >
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" 
                alt="Cafe Interior" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-all"></div>
            </motion.div>
            <div className="col-span-4 flex flex-col gap-4">
              <div className="flex-1 rounded-2xl bg-brand-dark border border-brand-border flex items-center justify-center p-4 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold font-serif text-brand-accent">2022</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-50">Established</div>
                </div>
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1937&auto=format&fit=crop" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 rounded-2xl bg-brand-accent border border-brand-border flex items-center justify-center p-4 text-center text-brand-black">
                <div className="space-y-2">
                  <div className="text-3xl font-bold font-serif">10k+</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold">Coffee Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Menu Section --- */}
      <section id="menu" className="py-24 bg-brand-dark relative px-4 md:px-8 border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-baseline mb-12 border-b border-brand-border pb-6">
            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">The <span className="italic font-serif normal-case font-light">Menu</span></h3>
            <span className="text-brand-accent text-xs font-mono uppercase hidden sm:block">Freshly Roasted • Locally Sourced</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
            {MENU_DATA.map((category, catIdx) => (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-brand-accent text-xs uppercase font-bold mb-8 tracking-widest flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-brand-accent"></span> 0{catIdx + 1}. {category.title}
                </h4>
                <ul className="space-y-6">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="group cursor-default">
                      <div className="flex justify-between items-baseline">
                        <span className="text-lg font-medium group-hover:text-brand-accent-light transition-colors">{item.name}</span>
                        <span className="menu-dotted-line"></span>
                        <span className="font-mono text-lg text-brand-accent-light">₹{item.price}</span>
                      </div>
                      <p className="text-xs opacity-40 mt-1 max-w-sm uppercase tracking-wider">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About & Social Section --- */}
      <section id="about" className="py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
             <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden mt-12">
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
             </div>
          </div>
          <motion.div 
            className="lg:col-span-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-accent text-xs uppercase font-bold tracking-[0.3em] block mb-6">Our Philosophy</span>
            <h3 className="text-6xl font-light font-serif mb-8 italic">More than just a <span className="not-italic font-bold text-brand-accent">Cup.</span></h3>
            <p className="text-lg opacity-70 leading-relaxed mb-10">
              Bean Haven is a calm sanctuary amidst the bustle of Kalamboli. We believe every serve is a chance to inspire. Our beans are sourced ethically and brewed with precision to give you that perfect escape.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-center group">
                <div className="w-12 h-12 bg-brand-card border border-brand-border flex items-center justify-center rounded-xl group-hover:border-brand-accent transition-all">
                  <Wifi className="text-brand-accent" size={20} />
                </div>
                <div className="text-sm uppercase tracking-widest font-bold">Complimentary 1Gbps WiFi</div>
              </div>
              <div className="flex gap-4 items-center group">
                <div className="w-12 h-12 bg-brand-card border border-brand-border flex items-center justify-center rounded-xl group-hover:border-brand-accent transition-all">
                  <Star className="text-brand-accent" size={20} />
                </div>
                <div className="text-sm uppercase tracking-widest font-bold">Artisanal Small Batches</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Gallery Grid --- */}
      <section id="gallery" className="py-24 bg-brand-dark px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black uppercase tracking-tighter mb-4 italic font-serif">The Gallery</h3>
            <div className="w-24 h-1 bg-brand-accent mx-auto"></div>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1937&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1974&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1974&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2032&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070&auto=format&fit=crop"
            ].map((img, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="break-inside-avoid relative group"
              >
                <img src={img} className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer & Contact Detail Block --- */}
      <footer id="contact" className="py-32 px-4 md:px-8 border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
            <div className="lg:col-span-5">
              <div className="flex gap-1 text-brand-accent mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-3xl font-serif italic mb-10 opacity-80 leading-snug">
                "Finding a place that cares about its beans as much as its atmosphere is rare. Bean Haven is that place."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-accent"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Local Insider Reviews</span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 text-right">
              <div className="space-y-8">
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-brand-accent tracking-[0.2em] mb-4">Location</h5>
                  <p className="font-mono text-sm opacity-70">Sector 10, Kalamboli, <br />Navi Mumbai, IN</p>
                </div>
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-brand-accent tracking-[0.2em] mb-4">Inquiries</h5>
                  <p className="font-mono text-sm opacity-70">beanhaven@gmail.com</p>
                  <p className="font-mono text-sm opacity-70">+91 98765 43210</p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-brand-accent tracking-[0.2em] mb-4">Social</h5>
                  <ul className="space-y-2 text-sm uppercase tracking-widest font-medium opacity-60">
                    <li><a href="#" className="hover:text-brand-accent">Instagram</a></li>
                    <li><a href="#" className="hover:text-brand-accent">Facebook</a></li>
                    <li><a href="#" className="hover:text-brand-accent">Google Maps</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row justify-between items-center opacity-30 text-[10px] uppercase tracking-[0.4em] font-medium gap-6">
            <span>© 2024 Bean Haven Café</span>
            <span className="text-center font-bold">Premium Fresh Brews • Kalamboli</span>
            <span>Back to Top ↑</span>
          </div>
        </div>
      </footer>

      {/* Fixed Order Button for Mobile */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden fixed bottom-8 right-8 z-50 w-16 h-16 bg-brand-accent text-brand-black flex items-center justify-center rounded-full shadow-2xl"
      >
        <Utensils size={24} />
      </motion.button>

    </div>
  );
}
