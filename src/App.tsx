/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Check, 
  Sliders, 
  Sparkles, 
  Compass, 
  Grid, 
  FileText, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Architectural Theme Definitions
interface Theme {
  id: string;
  name: string;
  tagline: string;
  description: string;
  class: string;
  colors: string[];
}

const THEMES: Theme[] = [
  {
    id: 'japandi',
    name: 'Japandi Warm',
    tagline: 'Quiet Warmth & Organic Simplicity',
    description: 'A serene marriage of Scandinavian functionalism and Japanese wabi-sabi. Soft beige, sand tones, earthy gold accents, and elegant, spacious typography.',
    class: 'theme-japandi',
    colors: ['#FBF9F6', '#F4EFEB', '#C5A880', '#1F1F1F']
  },
  {
    id: 'concrete',
    name: 'Minimal Concrete',
    tagline: 'Bauhaus Structuralism & Modern Lines',
    description: 'Inspired by pristine industrial spaces, raw concrete, geometric structures, and the raw beauty of structural lines. Technical sans typography with architectural rust accents.',
    class: 'theme-concrete',
    colors: ['#F1F2F5', '#E3E5EA', '#9A5B3D', '#111111']
  },
  {
    id: 'nordic',
    name: 'Nordic Forest',
    tagline: 'Serene Nature & Evergreen Forest',
    description: 'Capturing the deep, quiet atmosphere of Nordic moss valleys. Soft limestone gray, birch wood underlayers, evergreen forest titles, and calm sage accents.',
    class: 'theme-nordic',
    colors: ['#F4F6F5', '#E4EBE7', '#6C8E7B', '#1A2B23']
  },
  {
    id: 'desert',
    name: 'Desert Modernist',
    tagline: 'Sun-Bleached Clay & Sculpted Air',
    description: 'Inspired by the warm clay tones and dramatic sky contrasts of Coachella luxury retreats. High-contrast terracotta, sun-baked ivory, and editorial serif headers.',
    class: 'theme-desert',
    colors: ['#FAF6F1', '#F2E3D8', '#CC7B5C', '#332018']
  },
  {
    id: 'parisian',
    name: 'Parisian Classic',
    tagline: 'Limestone Haussmann & Regal Gold',
    description: 'Evoking the neoclassical grandeur of Parisian stone facades and brass moldings. Symmetrical limestone backgrounds, deep ink texts, and polished gold ornaments.',
    class: 'theme-parisian',
    colors: ['#FDFDFB', '#F8F3EA', '#D4AF37', '#0F141A']
  }
];

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  year: string;
  size: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Soma Villa',
    category: 'villas',
    location: 'Tiruppalai, Madurai',
    image: '/src/assets/images/luxury_villa_hero_1779811747915.png',
    description: 'A spectacular geometric residence showcasing sand-blasted concrete panels, expansive floor-to-ceiling glass pavilions, and custom water reflections.',
    year: '2025',
    size: '4,850 sq.ft',
    highlights: ['Natural Light Corridors', 'Thermal Insulation Plastering', 'Private Reflection Crypt']
  },
  {
    id: 2,
    title: 'Travertine Gallery Offices',
    category: 'commercial',
    location: 'K.K. Nagar, Madurai',
    image: '/src/assets/images/architectural_travertine_1779811766417.png',
    description: 'A landmark multi-tier commercial showroom clad entirely in Italian travertine blocks with custom engineered vertical sunshades creating elegant afternoon shadows.',
    year: '2024',
    size: '12,500 sq.ft',
    highlights: ['Monolithic Travertine Facade', 'Solar Aspect Alignments', 'Acoustic Glass Partitions']
  },
  {
    id: 3,
    title: 'Loom Sanctuary Corner',
    category: 'interiors',
    location: 'Anna Nagar, Madurai',
    image: '/src/assets/images/minimal_villa_interior_1779811794733.png',
    description: 'An interior masterpiece utilizing fluted off-white plaster pillars, limestone sculptural coffee blocks, and natural linen textures to frame a minimalist courtyard.',
    year: '2025',
    size: '1,200 sq.ft',
    highlights: ['Hand-Fluted Plaster Pillars', 'Linen Sound-Dampening Walls', 'Double-Glazed Garden View']
  },
  {
    id: 4,
    title: 'Verdant Heights Apartments',
    category: 'apartments',
    location: 'Tiruppalai, Madurai',
    image: '/src/assets/images/luxury_apartment_1779811854344.png',
    description: 'An elite residential low-rise complex presenting floating concrete balcony cantilevers, custom warm timber louvers, and vertical continuous hanging gardens.',
    year: '2024',
    size: '8 Signature Units',
    highlights: ['Rainwater Harvesting Core', 'Hanging Botanical Facades', 'Asymmetric Cantilevers']
  },
  {
    id: 5,
    title: 'Monolith Executive Outpost',
    category: 'commercial',
    location: 'Othakadai, Madurai',
    image: '/src/assets/images/modern_commercial_1779811873247.png',
    description: 'A premium corporate headquarters highlighting clean matte steel support grids, high-performance dark glass glazing, and a majestic water foyer.',
    year: '2025',
    size: '18,500 sq.ft',
    highlights: ['Glazed Glass Curtain Wall', 'Groundwater Cooled Foyer', 'Industrial-Finish Steelwork']
  },
  {
    id: 6,
    title: 'The Atrium Villa Project',
    category: 'villas',
    location: 'Iyer Bungalow, Madurai',
    image: '/src/assets/images/minimal_villa_interior_1779811794733.png',
    description: 'A custom-built single residential bungalow organized strategically around an open-air Zen atrium garden and deep local granite pillars.',
    year: '2023',
    size: '5,200 sq.ft',
    highlights: ['Rainwater Courtyard Well', 'Structural Local Granite Pillar', 'Hidden Shadowgap Lighting']
  }
];

const SERVICES = [
  {
    title: 'Villa Construction',
    icon: 'fa-solid fa-home',
    image: '/src/assets/images/luxury_villa_hero_1779811747915.png',
    desc: 'Creating custom architectural estates that reflect visual purity, structural durability, and personal serenity.'
  },
  {
    title: 'Apartment Projects',
    icon: 'fa-solid fa-building',
    image: '/src/assets/images/luxury_apartment_1779811854344.png',
    desc: 'Designing and building premium low-rise multi-family residences framed with ventilation, gardens, and light.'
  },
  {
    title: 'Commercial Buildings',
    icon: 'fa-solid fa-layer-group',
    image: '/src/assets/images/modern_commercial_1779811873247.png',
    desc: 'Bespoke corporate spaces and showrooms designed to drive brand prestige, productivity, and thermal cooling.'
  },
  {
    title: 'Interior Solutions',
    icon: 'fa-solid fa-chair',
    image: '/src/assets/images/minimal_villa_interior_1779811794733.png',
    desc: 'High-end curations featuring custom furniture elements, fluted plaster columns, and refined sensory harmony.'
  },
  {
    title: 'Specialized Renovation',
    icon: 'fa-solid fa-hammer',
    image: '/src/assets/images/architectural_travertine_1779811766417.png',
    desc: 'Restructuring older properties with premium retrofitting, space expansions, and ultra-modern aesthetic upgrades.'
  },
  {
    title: 'Site Planning & approvals',
    icon: 'fa-solid fa-compass-drafting',
    image: '/src/assets/images/luxury_villa_hero_1779811747915.png',
    desc: 'Turnkey land analysis, localized topography checking, structural engineering plans, and Madurai corporation clearances.'
  }
];

const TESTIMONIALS = [
  {
    quote: "G K Builders turned our vision of a serene family oasis into an architectural reality. Their dedication to custom sand-cast concrete elements and limestone wall detailing was genuinely masterclass.",
    author: "Ramesh Shanmugam",
    project: "Soma Villa Owner",
    location: "Tiruppalai, Madurai"
  },
  {
    quote: "Our new Travertine Gallery office stands as a monument-grade landmark in K.K. Nagar. G K Builders delivered impeccable timing, flawless structural integrity, and remarkable design sensitivity.",
    author: "Meenakshi Sundaram",
    project: "Managing Director, Monolith Group",
    location: "Madurai"
  },
  {
    quote: "Personalized layouts and absolute technical transparency. We collaborated on building our multi-family flats; they exceeded every Indian luxury building standard with style.",
    author: "Vignesh Kumar",
    project: "Luxury Developer",
    location: "Iyer Bungalow, Madurai"
  }
];

const FAQS = [
  {
    question: "What geographical areas do you serve in Madurai?",
    answer: "Our primary architecture office and site development hub is in Tiruppalai, Madurai. However, we construct luxury custom homes, apartment blocks, and commercial landmarks across all of Madurai and neighbouring districts, including K.K. Nagar, Anna Nagar, Iyer Bungalow, Othakadai, and Madurai North residential corridors."
  },
  {
    question: "Do you handle the entire municipal approval and paperwork process?",
    answer: "Yes, G K Builders operates as a comprehensive turnkey contracting service. We handle everything from the initial soil testing, localized load structural engineering reports, architectural blue-prints, all the way to acquiring the official Madurai Corporation building permissions, electrical grids registrations, and safety certificates."
  },
  {
    question: "How is the construction budget determined and managed?",
    answer: "We establish a rigid, fully itemized line-by-line contract checklist before any shovels touch the ground. This material-linked list maps out structural concrete grades, reinforcement steel weight, premium fixture choices, and carpentry materials. This protects clients from hidden expenses and keeps the project fully transparent."
  },
  {
    question: "Can we experience our architectural layout before construction starts?",
    answer: "Naturally. Part of our luxury planning service is creating deep conceptual 3D renders, architectural moodboards with real physical stone and timber samples, and isometric space audits to allow you to analyze circulation paths and shadow directions before pour dates are scheduled."
  },
  {
    question: "What concrete steps do you take to ensure building longevity?",
    answer: "We source our raw cement and steel only from primary high-tensile manufacturers and run continuous laboratory compression testing on our poured batch cubes. Our construction sites employ double-brick thermal barriers, specialized chemical proofing of foundations against Madurai's groundwater table, and rigorous curing schedules."
  }
];

export default function App() {
  // Global App States
  const activeTheme = THEMES[0];
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Custom Cursor States
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  // App Landing Intro Animation State
  const [appLoading, setAppLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  // Form Management States
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Villa',
    message: ''
  });

  // Track active navigation link on scroll
  const [activeNavSection, setActiveNavSection] = useState('home');

  // Trigger loading count
  useEffect(() => {
    if (appLoading) {
      const interval = setInterval(() => {
        setLoadPercent(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setAppLoading(false), 400); // slight buffer for clean exit
            return 100;
          }
          return prev + 2;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [appLoading]);

  // Handle Scroll Progress & Navbar Shift & Active Navigation Detection
  useEffect(() => {
    const handleScroll = () => {
      // Progress calculation
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (windowHeight > 0) {
        setScrollPercent((window.scrollY / windowHeight) * 100);
      }
      
      // Navbar opaque check
      setNavScrolled(window.scrollY > 40);

      // Section observer tracking
      const sections = ['home', 'theme-philosophy', 'about', 'services', 'projects', 'why-choose', 'testimonials', 'faq', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveNavSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if touch device for Cursor effects
  useEffect(() => {
    const checkTouch = () => {
      setIsMobileDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Capture Mouse Position for Premium Cursor Effect
  useEffect(() => {
    if (isMobileDevice) return;

    const updateMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, [isMobileDevice]);

  // Automatically sync theme changes with body element wrapper for CSS Variables to trigger smoothly
  useEffect(() => {
    const body = document.body;
    THEMES.forEach(t => body.classList.remove(t.class));
    body.classList.add(activeTheme.class);
  }, [activeTheme]);

  // Scroll to section helper
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Interaction handlers for cursor labels
  const onHoverInteractive = (label = '', isHovering = true) => {
    if (isMobileDevice) return;
    setCursorHovered(isHovering);
    setCursorLabel(label);
  };

  // Filtered Projects
  const filteredProjects = selectedFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedFilter);

  // Handle test form submit
  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 bg-primary-theme text-primary-theme`}>
      
      {/* 1. REAL-TIME SCROLL PROGRESS BAR */}
      <div className="scroll-progress" style={{ width: `${scrollPercent}%` }} />

      {/* 2. CUSTOM FLOATING MOUSE CURSOR */}
      {!isMobileDevice && (
        <div 
          className="fixed pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-theme bg-transparent mix-blend-difference"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: cursorHovered ? '80px' : '22px',
            height: cursorHovered ? '80px' : '22px',
            borderColor: 'var(--color-accent)',
            backgroundColor: cursorHovered ? 'var(--color-cursor)' : 'transparent',
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {cursorHovered && cursorLabel && (
            <span className="font-mono text-[9px] tracking-widest text-[var(--color-text-primary)] uppercase leading-none font-bold animate-fade-in px-1 text-center">
              {cursorLabel}
            </span>
          )}
        </div>
      )}

      {/* 3. SHIMMERING DESIGNER LOADING SCREEN */}
      {appLoading && (
        <div className="fixed inset-0 bg-[#FBF9F6] z-50 flex flex-col items-center justify-center transition-opacity duration-700 select-none">
          <div className="w-[120px] h-[120px] relative mb-8 flex items-center justify-center">
            {/* Elegant rotating geometry */}
            <div className="absolute inset-0 border border-t-[#C5A880] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 border border-b-[#C5A880] border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
            {/* Elegant minimalist Monogram */}
            <div className="flex flex-col items-center">
              <span className="font-display text-4xl font-bold tracking-[0.2em] text-[#1F1F1F]">GK</span>
              <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-[#6B6256] mt-1">MADURAI</span>
            </div>
          </div>
          <div className="w-[180px] h-[1px] bg-neutral-200 relative overflow-hidden mb-2">
            <div 
              className="absolute h-full bg-[#C5A880] transition-all duration-250 ease-out"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <div className="flex justify-between w-[180px] font-mono text-[9px] tracking-wider text-neutral-400">
            <span>STUDIO MONARCH</span>
            <span>{loadPercent}%</span>
          </div>
        </div>
      )}

      {/* 4. TRANSPARENT FLOATING NAVBAR STYLED IN HARMONY WITH ACTIVE THEME */}
      <nav 
        id="aistudio-navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
          navScrolled 
            ? 'py-4 shadow-sm border-b border-theme bg-primary-theme/95 backdrop-blur-md' 
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Brand/Logo Element */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }} 
            className="flex flex-col select-none group"
            onMouseEnter={() => onHoverInteractive('GK HOME')}
            onMouseLeave={() => onHoverInteractive()}
          >
            <div className="flex items-baseline space-x-1">
              <span className="font-display text-2xl lg:text-3xl font-bold tracking-widest text-primary-theme transition-transform duration-500 group-hover:translate-x-0.5">G K</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-theme inline-block ml-0.5" />
            </div>
            <span className="font-mono text-[8px] tracking-[0.55em] uppercase text-secondary-theme leading-none mt-1">BUILDERS & STUDIO</span>
          </a>

          {/* Desktop Navigation Links (Large Screens) */}
          <div className="hidden lg:flex items-center space-x-10">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Studio' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                className={`font-mono text-[10px] tracking-widest uppercase transition-colors duration-500 py-1.5 relative group ${
                  activeNavSection === link.id ? 'text-accent-theme font-semibold' : 'text-primary-theme/70 hover:text-primary-theme'
                }`}
                onMouseEnter={() => onHoverInteractive(`GO ${link.label.toUpperCase()}`)}
                onMouseLeave={() => onHoverInteractive()}
              >
                {link.label}
                {/* Micro underline effect */}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-theme transition-all duration-500 ${
                  activeNavSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
          </div>

          {/* Controls (Mobile Menu Burger) */}
          <div className="flex items-center space-x-4">
            {/* Mobile Burger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden border border-theme rounded-md transition-colors hover:bg-secondary-theme flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-primary-theme" /> : <Menu className="w-5 h-5 text-primary-theme" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full border-b border-theme bg-[var(--color-bg-primary)] shadow-xl py-8 px-6 flex flex-col space-y-5 animate-fade-in lg:hidden">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About G K Builders' },
              { id: 'services', label: 'Our Services' },
              { id: 'projects', label: 'Project Portfolio' },
              { id: 'faq', label: 'F.A.Q' },
              { id: 'contact', label: 'Book Consultation' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                className={`font-mono text-xs tracking-widest uppercase py-2 border-b border-theme/40 ${
                  activeNavSection === link.id ? 'text-accent-theme font-bold pl-2' : 'text-primary-theme/80 pl-0'
                } transition-all duration-300`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* 5. CINEMATIC HERO SECTION (VILLA PARALLAX HERO) */}
      <section 
        id="home" 
        className="relative min-h-screen w-full flex flex-col justify-center items-center pt-24 px-6 lg:px-12 select-none overflow-hidden"
      >
        {/* Fullscreen Background Media - Modern Villa Image */}
        <div className="absolute inset-0 bg-black overflow-hidden z-0">
          <img 
            src="/src/assets/images/luxury_villa_hero_1779811747915.png"
            alt="Monolithic Modern Concrete Villa Architecture Design"
            className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 pointer-events-none transition-transform duration-[10s] ease-out animate-pulse"
            style={{ animationDuration: '40s' }}
            referrerPolicy="no-referrer"
          />
          {/* Subtle Warm overlays linked with the theme styling */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
          />
          {/* Radial Elegant Gradient focusing the user's vision */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-[#0A0A0A]/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center items-start text-left mt-12 py-12">
          {/* Top Label */}
          <div className="inline-flex items-center space-x-3 mb-6 animate-fade-in pl-1">
            <span className="h-[1px] w-8 bg-neutral-400" />
            <span className="font-mono text-[10px] lg:text-xs tracking-[0.5em] text-neutral-300 uppercase font-medium">LUXURY RESIDENTIAL & COMMERCIAL ARCHITECTS</span>
          </div>

          {/* Massive Editorial Header - Crafting Spaces That Inspire */}
          <h1 className="font-display text-[10vw] sm:text-[7vw] lg:text-[5vw] leading-[1.05] tracking-tight text-white font-serif max-w-4xl select-text mb-6">
            Crafting Spaces <br className="hidden sm:block" />
            That <span className="font-normal italic font-display text-neutral-300">Inspire</span>
          </h1>

          {/* Subheading */}
          <p className="font-sans text-sm sm:text-base lg:text-lg text-neutral-300 max-w-2xl font-light text-left leading-relaxed select-text mt-2 mb-10 pl-1">
            G K Builders specializes in custom high-end architectural villas, contemporary apartments, and flagship commercial structures in Tiruppalai, Madurai.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 sm:gap-6 pl-1 w-full sm:w-auto">
            <button 
              onClick={() => scrollTo('projects')}
              className="px-8 py-4 bg-[#FBF9F6] text-[#1F1F1F] font-mono text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center space-x-3 rounded shadow-md group hover:bg-[#C5A880] hover:text-[#FFF]"
              onMouseEnter={() => onHoverInteractive('GALLERY')}
              onMouseLeave={() => onHoverInteractive()}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 bg-transparent border border-white text-white font-mono text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center space-x-3 rounded backdrop-blur-sm hover:bg-white hover:text-[#111]"
              onMouseEnter={() => onHoverInteractive('TALK TO ARCHITECT')}
              onMouseLeave={() => onHoverInteractive()}
            >
              <span>Contact Us</span>
              <Mail className="w-4 h-4 text-white hover:text-black transition-colors" />
            </button>
          </div>
        </div>

        {/* Scroll down mouse indicator */}
        <div 
          onClick={() => scrollTo('theme-philosophy')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:translate-y-1"
        >
          <span className="font-mono text-[8px] tracking-[0.4em] text-neutral-400 uppercase mb-3 select-none">SCROLL TO ATELIER</span>
          <div className="w-5 h-8 rounded-full border border-neutral-400 flex justify-center items-start p-1.5">
            <div className="w-1 h-2 bg-neutral-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 6. ATELIER MOODS PANEL SECTION - EXPLORE SIGNATURE AESTHETIC */}
      <section 
        id="theme-philosophy" 
        className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-secondary-theme border-y border-theme relative select-none"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-accent-theme animate-pulse" />
                <span className="font-mono text-[9px] lg:text-[10px] tracking-widest text-secondary-theme uppercase font-medium">DESIGN ATELIER PHILOSOPHY</span>
              </div>
              <h2 className="font-display text-3xl lg:text-5xl font-serif tracking-tight text-primary-theme">
                Our Signature Design Aesthetic
              </h2>
            </div>
            <p className="font-sans text-[11px] lg:text-xs text-secondary-theme font-mono tracking-wider max-w-sm mt-4 md:mt-0 leading-relaxed uppercase">
              // Spaces constructed on quiet warmth, organic materials, and minimalist wabi-sabi geometry.
            </p>
          </div>

          {/* Signature Aesthetic Spotlight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
            <div className="lg:col-span-8 border border-theme p-8 lg:p-12 rounded bg-primary-theme flex flex-col justify-between transition-colors duration-1000">
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-accent-theme font-semibold block mb-3">SIGNATURE DESIGN PHILOSOPHY</span>
                <h3 className="font-display text-4xl lg:text-5xl font-serif text-primary-theme mb-4 tracking-wide">{activeTheme.name}</h3>
                <p className="font-sans text-[15px] lg:text-lg font-light text-secondary-theme leading-relaxed max-w-3xl mb-8 select-text">
                  "{activeTheme.description}"
                </p>
              </div>

              {/* Decorative Swatches */}
              <div className="flex items-center space-x-4 pt-6 border-t border-theme/40">
                <span className="font-mono text-[9px] tracking-widest text-secondary-theme uppercase">PALETTE STACKS:</span>
                <div className="flex items-center -space-x-2">
                  {activeTheme.colors.map((color, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 rounded-full border border-primary-theme shadow-sm relative group"
                      style={{ backgroundColor: color }}
                    >
                      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white font-mono text-[8px] px-1 rounded -top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Values Callout Section */}
            <div className="lg:col-span-4 border border-theme p-8 rounded bg-primary-theme flex flex-col justify-between items-start">
              <div className="space-y-6">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-accent-theme font-semibold block">AESTHETIC FOUNDATIONS</span>
                
                <div>
                  <h4 className="font-display text-base font-serif text-primary-theme mb-1">Quiet Warmth</h4>
                  <p className="font-sans text-[11px] text-secondary-theme leading-relaxed font-light">
                    Sourcing soft linen textures, timber panelings, and earth-toned coatings to foster comforting, secure residential sanctuaries.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-theme/40">
                  <h4 className="font-display text-base font-serif text-primary-theme mb-1">Wabi-Sabi Geometries</h4>
                  <p className="font-sans text-[11px] text-secondary-theme leading-relaxed font-light">
                    Embracing asymmetry, raw textured plastering, and stone elements that gracefully develop character over generations.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-theme/40">
                  <h4 className="font-display text-base font-serif text-primary-theme mb-1">Scandinavian Function</h4>
                  <p className="font-sans text-[11px] text-secondary-theme leading-relaxed font-light">
                    Maximizing functional pathways, localized orientation for thermal control, and pristine structural concrete integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT SECTION (SPLIT SCREEN ARCHITECTURAL EDITORIAL) */}
      <section id="about" className="py-20 lg:py-32 w-full px-6 lg:px-12 select-text">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Image Framing */}
            <div className="relative group overflow-hidden border border-theme p-4 min-h-[400px] lg:min-h-[550px] flex">
              <div className="absolute inset-0 bg-neutral-900 overflow-hidden m-4">
                <img 
                  src="/src/assets/images/architectural_travertine_1779811766417.png" 
                  alt="Travertine Architecture Facade by G K Builders"
                  className="w-full h-full object-cover grayscale opacity-90 transition-all duration-[6s] group-hover:scale-105 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-accent-theme/10 mix-blend-multiply pointer-events-none" />
              </div>
              {/* Overlapping small design label */}
              <div className="absolute bottom-8 right-8 bg-primary-theme border border-theme p-4 text-left select-none animate-fade-in hidden sm:block">
                <span className="font-mono text-[9px] tracking-widest text-accent-theme uppercase font-bold block mb-1">FOUNDATION CODES:</span>
                <span className="font-display italic text-sm text-primary-theme block font-serif">"Primacy of Travertine and Concrete."</span>
              </div>
            </div>

            {/* Right Content Column */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center space-x-3 mb-6 select-none">
                <span className="h-[1px] w-8 bg-accent-theme" />
                <span className="font-mono text-[9px] lg:text-[10px] tracking-widest text-accent-theme uppercase font-bold">G K BUILDERS ORIGINS</span>
              </div>

              <h2 className="font-display text-4xl lg:text-5xl font-serif tracking-tight text-primary-theme leading-tight mb-8">
                Spaces Built to Stand <br className="hidden sm:block" /> For <span className="font-normal italic">Generations</span>
              </h2>

              <div className="space-y-6 text-sm lg:text-base font-light text-secondary-theme leading-relaxed">
                <p>
                  G K Builders, established in the scenic residential zone of Tiruppalai, Madurai, operates under a single architectural conviction: that structures should be built with absolute structural rigor and minimal geometric elegance. As premium contractors and design developers, we translate complex technical realities into living sanctuaries.
                </p>
                <p>
                  Our expertise runs across multi-tier structures, classical luxury apartments, and private custom bungalows. Under the design direction of our engineering leaders, every concrete pour and raw material block must survive extreme quality validation.
                </p>
              </div>

              {/* Core Philosophy Markers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-theme/40 select-none">
                <div>
                  <span className="font-mono text-2xl text-accent-theme font-light block mb-2 font-display">01/</span>
                  <span className="font-mono text-[10px] tracking-wider text-primary-theme uppercase font-semibold block mb-1">STUDIO VISION</span>
                  <span className="text-[11px] text-secondary-theme font-light leading-relaxed">Elevating standard living spaces into custom architectural works.</span>
                </div>
                <div>
                  <span className="font-mono text-2xl text-accent-theme font-light block mb-2 font-display">02/</span>
                  <span className="font-mono text-[10px] tracking-wider text-primary-theme uppercase font-semibold block mb-1">MUNICIPAL DECREE</span>
                  <span className="text-[11px] text-secondary-theme font-light leading-relaxed">100% legal clearance with absolute transparency.</span>
                </div>
                <div>
                  <span className="font-mono text-2xl text-accent-theme font-light block mb-2 font-display">03/</span>
                  <span className="font-mono text-[10px] tracking-wider text-primary-theme uppercase font-semibold block mb-1">ELITE SENSORY</span>
                  <span className="text-[11px] text-secondary-theme font-light leading-relaxed">Tailored palettes across organic tones, timber, and copper.</span>
                </div>
              </div>

              {/* Founder's Signature Block */}
              <div className="flex items-center space-x-5 mt-12 bg-secondary-theme/50 p-5 border border-theme rounded select-none">
                <div className="w-12 h-12 rounded-full border border-theme bg-primary-theme flex items-center justify-center font-display text-md font-bold text-accent-theme">
                  GK
                </div>
                <div>
                  <span className="font-display tracking-wider text-primary-theme font-serif font-bold text-sm block">G. Karthik, M.Arch</span>
                  <span className="font-mono text-[8px] tracking-[0.25em] text-secondary-theme uppercase block mt-0.5">MANAGING ARCHITECT, TIRUPPALAI</span>
                </div>
                <div className="ml-auto opacity-35 hover:opacity-100 transition-opacity hidden sm:block">
                  <span className="font-mono text-[11px] italic pr-2 font-serif text-accent-theme">"Precision, Honesty, Sincerity"</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. SERVICES SECTION (LARGE ARCHITECTURAL CARD LAYOUTS) */}
      <section id="services" className="py-20 lg:py-28 bg-secondary-theme border-y border-theme select-text">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 select-none">
            <div className="inline-flex items-center space-x-3 mb-4">
              <span className="h-[1px] w-6 bg-accent-theme" />
              <span className="font-mono text-[9px] lg:text-[10px] tracking-widest text-accent-theme uppercase font-bold">PROFESSIONAL CAPABILITIES</span>
              <span className="h-[1px] w-6 bg-accent-theme" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-serif text-primary-theme tracking-tight mb-4">
              Turnkey Drafting & Building
            </h2>
            <p className="font-sans text-sm text-secondary-theme font-light leading-relaxed">
              We operate across all layers of the construction pipeline, ensuring that from raw land surveys to precise indoor light placements, you experience perfect architectural service.
            </p>
          </div>

          {/* Asymmetric Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {SERVICES.map((serv, index) => {
              // Asymmetric tallness for architectural styling rhythm
              const isTall = index % 3 === 1;
              return (
                <div 
                  key={serv.title}
                  className={`group border border-theme bg-primary-theme rounded overflow-hidden flex flex-col justify-between transition-all duration-700 hover:shadow-lg ${
                    isTall ? 'lg:translate-y-6 shadow-sm' : ''
                  }`}
                  onMouseEnter={() => onHoverInteractive('EXPLORE CAPABILITY')}
                  onMouseLeave={() => onHoverInteractive()}
                >
                  <div className="h-48 overflow-hidden relative border-b border-theme select-none">
                    <img 
                      src={serv.image} 
                      alt={`GK Builders ${serv.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] opacity-85"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />
                    {/* Floating service layout index */}
                    <span className="absolute top-4 right-4 bg-primary-theme/90 backdrop-blur-sm border border-theme px-2 py-1 rounded font-mono text-[9px] text-accent-theme font-semibold shadow-sm leading-none">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between min-h-[220px]">
                    <div>
                      {/* Font-Awesome icon as specified with theme colors */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 rounded border border-theme flex items-center justify-center bg-secondary-theme">
                          <i className={`${serv.icon} text-accent-theme text-xs`} />
                        </div>
                        <h3 className="font-display text-lg lg:text-xl font-serif text-primary-theme">{serv.title}</h3>
                      </div>
                      <p className="font-sans text-[12px] lg:text-sm text-secondary-theme font-light leading-relaxed mb-6">
                        {serv.desc}
                      </p>
                    </div>

                    <div className="border-t border-theme/40 pt-4 flex items-center justify-between pointer-events-none select-none">
                      <span className="font-mono text-[9px] tracking-wide text-accent-theme uppercase font-medium">GK SPECIFICATIONS Clear Plan</span>
                      <ChevronRight className="w-4 h-4 text-accent-theme group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. PORTFOLIO SHOWCASE: LUXURY MASONRY GRID WITH INTERACTIVE FILTERING */}
      <section id="projects" className="py-20 lg:py-32 w-full px-6 lg:px-12 select-text">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 select-none">
            <div>
              <div className="inline-flex items-center space-x-3 mb-4">
                <span className="h-[1px] w-8 bg-accent-theme" />
                <span className="font-mono text-[9px] lg:text-[10px] tracking-widest text-accent-theme uppercase font-bold">MONUMENTAL SHOWCASE</span>
              </div>
              <h2 className="font-display text-4xl lg:text-6xl font-serif tracking-tight text-primary-theme">
                High-End Portfolios
              </h2>
            </div>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-8 md:mt-0 font-mono text-[9px] lg:text-[10px] tracking-wider uppercase border-b border-theme/50 pb-2">
              {[
                { filter: 'all', label: 'All Projects' },
                { filter: 'villas', label: 'Villas' },
                { filter: 'apartments', label: 'Apartments' },
                { filter: 'commercial', label: 'Commercial' },
                { filter: 'interiors', label: 'Interiors' }
              ].map((pill) => (
                <button
                  key={pill.filter}
                  onClick={() => setSelectedFilter(pill.filter)}
                  className={`px-4 py-2 border rounded transition-all duration-300 ${
                    selectedFilter === pill.filter 
                      ? 'bg-accent-theme border-accent-theme text-[var(--color-bg-primary)] font-bold shadow-sm' 
                      : 'bg-transparent border-theme/40 text-primary-theme hover:border-theme'
                  }`}
                  onMouseEnter={() => onHoverInteractive(`SHOW ${pill.label.toUpperCase()}`)}
                  onMouseLeave={() => onHoverInteractive()}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-Style Portfolio Grid */}
          <div className="masonry-col-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="masonry-item bg-primary-theme border border-theme rounded overflow-hidden shadow-sm group transform transition-all duration-700 hover:shadow-lg hover:-translate-y-1 block"
                onMouseEnter={() => onHoverInteractive('LAUNCH PROJECT VIEW')}
                onMouseLeave={() => onHoverInteractive()}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden group/img aspect-[4/3] border-b border-theme select-none">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-[8s]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Absolute subtle elegant slide-up details overlay on image */}
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6">
                    <span className="font-mono text-[9px] bg-primary-theme/90 backdrop-blur-sm px-2 py-0.5 rounded text-accent-theme font-medium border border-theme self-start leading-none uppercase tracking-widest shadow">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-white tracking-widest flex items-center space-x-1.5 self-end underline">
                      <span>EXPLORE SPECS</span>
                      <ExternalLink className="w-3 h-3 text-white" />
                    </span>
                  </div>
                </div>

                {/* Text Specs Section */}
                <div className="p-6 text-left">
                  <div className="flex justify-between items-baseline mb-2 select-none">
                    <span className="font-mono text-[9px] tracking-widest text-accent-theme uppercase font-medium">MADURAI // {project.year}</span>
                    <span className="font-mono text-[9px] text-secondary-theme uppercase font-light border border-theme/40 px-1.5 py-0.5 rounded">{project.size}</span>
                  </div>

                  <h3 className="font-display text-xl lg:text-2xl font-serif text-primary-theme mb-3 group-hover:text-accent-theme transition-colors font-medium">
                    {project.title}
                  </h3>

                  <p className="font-sans text-[12px] lg:text-[13px] font-light text-secondary-theme leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="border-t border-theme/40 pt-4 select-none">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-secondary-theme uppercase block mb-2 font-medium">ENGINEERING INTEGRATIONS:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.highlights.map((h, i) => (
                        <span 
                          key={i} 
                          className="font-mono text-[8px] px-2 py-1 bg-secondary-theme rounded border border-theme/35 text-secondary-theme leading-none uppercase tracking-wide"
                        >
                          ● {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="w-full text-center py-24 select-none">
              <span className="font-serif italic text-lg text-secondary-theme">No layouts matching the active filters at this moment.</span>
            </div>
          )}
        </div>
      </section>

      {/* 10. WHY CHOOSE US (SOPHISTICATED DESIGN PILLARS & THIN DIVISION LINES) */}
      <section id="why-choose" className="py-20 lg:py-28 bg-secondary-theme border-y border-theme select-text">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16 select-none">
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center space-x-3 mb-4">
                <span className="h-[1px] w-8 bg-accent-theme" />
                <span className="font-mono text-[9px] lg:text-[10px] tracking-widest text-accent-theme uppercase font-bold">GK DIFFERENTIAL CORE</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-serif text-primary-theme tracking-tight mb-4 leading-tight">
                Why Experience Builders Settle for <span className="font-normal italic">GK</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="font-sans text-sm lg:text-base font-light text-secondary-theme leading-relaxed max-w-3xl">
                Tiruppalai's dynamic climate demands resilient architectural frameworks. We reject cookie-cutter building aesthetics and thin, fragile standard concrete in favor of high-resistance aggregates, fully legal corporation layouts, and curated boutique-level materials.
              </p>
            </div>
          </div>

          {/* Core Pillars Grid with Custom Fine Line Separators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 text-left mt-8">
            {[
              {
                num: '01',
                title: 'Timely Execution',
                desc: 'Milestone-based project sheets with automated schedules, securing your concrete hand-over date with detailed contracts.'
              },
              {
                num: '02',
                title: 'Premium Materials',
                desc: 'Complete inspection of every block, primary steel reinforce rods, luxury low-VOC paint aggregates, and stone cladding.'
              },
              {
                num: '03',
                title: 'Personalized Designs',
                desc: 'Circulation space checking and lighting simulations. Your architectural envelope is custom tailored to your family habits.'
              },
              {
                num: '04',
                title: 'Experienced Team',
                desc: 'A dedicated roster of seasoned structural engineers, municipal architects, site safety contractors, and plaster artisans.'
              },
              {
                num: '05',
                title: 'Modern Techniques',
                desc: 'Applying cross-ventilation principles, shadow play design vectors, thermal roof concrete tiles, and moisture proof chemical bases.'
              },
              {
                num: '06',
                title: 'Quality Assurance',
                desc: 'Mandatory structural load computations and physical laboratory testing of concrete batches during every structural pour.'
              }
            ].map((p, idx) => (
              <div 
                key={p.title}
                className="group border-t border-theme/50 pt-8 pb-4 flex flex-col justify-between hover:border-accent-theme transition-colors duration-500"
              >
                <div>
                  <div className="flex justify-between items-baseline mb-4 select-none">
                    <span className="font-mono text-[10px] tracking-widest text-[#FFF] uppercase leading-none font-bold bg-accent-theme px-2 py-1 rounded">
                      {p.num}
                    </span>
                    <span className="font-mono text-[8px] text-secondary-theme font-medium">VERIFIED CORE STATUS</span>
                  </div>
                  <h3 className="font-display text-lg lg:text-xl font-serif text-primary-theme mb-3 font-medium">{p.title}</h3>
                  <p className="font-sans text-[12px] lg:text-sm text-secondary-theme font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. TESTIMONIAL SECTION (EDITORIAL MAGAZINE STYLE SLIDER) */}
      <section id="testimonials" className="py-20 lg:py-32 w-full px-6 lg:px-12 select-text text-center">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="inline-flex items-center space-x-3 mb-6 select-none">
            <span className="h-[1px] w-6 bg-accent-theme" />
            <span className="font-mono text-[9px] lg:text-[10px] tracking-widest text-accent-theme uppercase font-bold">CLIENT LOGS & REFLECTIONS</span>
            <span className="h-[1px] w-6 bg-accent-theme" />
          </div>

          {/* Main Editorial Slide Container */}
          <div className="relative min-h-[250px] flex items-center justify-center py-10">
            {TESTIMONIALS.map((t, index) => {
              const isActive = index === activeTestimonial;
              return (
                <div 
                  key={index}
                  className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center items-center ${
                    isActive ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 translate-y-6 pointer-events-none'
                  }`}
                >
                  {/* Huge Decorative Quotation mark */}
                  <span className="font-serif text-[12vw] sm:text-[8vw] text-accent-theme/10 absolute -top-10 leading-none select-none font-bold font-display italic">“</span>
                  
                  <p className="font-display text-lg sm:text-xl lg:text-2xl font-serif italic text-primary-theme leading-relaxed max-w-2xl select-text relative z-10">
                    "{t.quote}"
                  </p>

                  <div className="mt-8 select-none">
                    <span className="font-display font-bold text-sm tracking-wide text-primary-theme block">{t.author}</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-secondary-theme uppercase block mt-1">
                      {t.project} — {t.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Controllers Custom Design */}
          <div className="flex justify-center items-center space-x-6 mt-12 select-none">
            <button 
              onClick={() => setActiveTestimonial(prev => prev === 0 ? TESTIMONIALS.length - 1 : prev - 1)}
              className="w-10 h-10 border border-theme rounded-full flex items-center justify-center transition-all hover:bg-secondary-theme"
              onMouseEnter={() => onHoverInteractive('PREVIOUS SLIDE')}
              onMouseLeave={() => onHoverInteractive()}
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-4 h-4 text-primary-theme" />
            </button>

            {/* Pagination dots */}
            <div className="flex items-center space-x-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? 'w-6 bg-accent-theme' : 'bg-accent-theme/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={() => setActiveTestimonial(prev => prev === TESTIMONIALS.length - 1 ? 0 : prev + 1)}
              className="w-10 h-10 border border-theme rounded-full flex items-center justify-center transition-all hover:bg-secondary-theme"
              onMouseEnter={() => onHoverInteractive('NEXT SLIDE')}
              onMouseLeave={() => onHoverInteractive()}
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-4 h-4 text-primary-theme" />
            </button>
          </div>

        </div>
      </section>

      {/* 12. FAQ SECTION (SPACIOUS ACCORDION DETAILS) */}
      <section id="faq" className="py-20 lg:py-28 bg-secondary-theme border-y border-theme select-text">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16 select-none">
            <div className="inline-flex items-center space-x-3 mb-4">
              <span className="h-[1px] w-6 bg-accent-theme" />
              <span className="font-mono text-[9px] lg:text-[10px] tracking-widest text-accent-theme uppercase font-bold">CLEAR ANSWERS & SPECIFICATIONS</span>
              <span className="h-[1px] w-6 bg-accent-theme" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-serif text-primary-theme tracking-tight mb-4">
              Project Inquiries
            </h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-theme rounded bg-primary-theme overflow-hidden transition-all duration-500 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-5 px-6 text-left flex justify-between items-center transition-colors hover:bg-secondary-theme select-none"
                    onMouseEnter={() => onHoverInteractive(isOpen ? 'CLOSE DETAILS' : 'OPEN DETAILS')}
                    onMouseLeave={() => onHoverInteractive()}
                  >
                    <span className="font-display font-medium text-sm sm:text-base text-primary-theme pr-4">
                      {faq.question}
                    </span>
                    <div className="w-6 h-6 rounded-full border border-theme flex items-center justify-center flex-shrink-0 bg-primary-theme">
                      <ChevronDown className={`w-3.5 h-3.5 text-accent-theme transition-transform duration-500 ${
                        isOpen ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>

                  <div 
                    className={`transition-all duration-500 overflow-hidden ${
                      isOpen ? 'max-h-[500px] border-t border-theme/40' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 font-sans text-[12px] sm:text-sm text-secondary-theme font-light leading-relaxed bg-secondary-theme/20">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. CONTACT PAGE & LUXURY QUESTIONNAIRE */}
      <section id="contact" className="py-20 lg:py-32 w-full px-6 lg:px-12 select-text">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Contact Details & Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-3 mb-6 select-none">
                  <span className="h-[1px] w-8 bg-accent-theme" />
                  <span className="font-mono text-[9px] lg:text-[10px] tracking-widest text-accent-theme uppercase font-bold">CLIENT RELATIONS ATELIER</span>
                </div>

                <h2 className="font-display text-4xl lg:text-6xl font-serif tracking-tight text-primary-theme mb-6 leading-none">
                  Commence your <br /> <span className="font-normal italic">Vision</span>
                </h2>

                <p className="font-sans text-sm lg:text-base font-light text-secondary-theme leading-relaxed max-w-lg mb-10">
                  Ready to draft your residential villa, apartment project, or commercial offices? Speak directly with our lead structural engineers in Tiruppalai, Madurai.
                </p>

                {/* Direct info cards */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 border border-theme flex items-center justify-center bg-secondary-theme rounded flex-shrink-0 select-none">
                      <MapPin className="w-4 h-4 text-accent-theme" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-secondary-theme uppercase block select-none">ARCHITECTURE STUDIO LOCATION</span>
                      <span className="font-display font-medium text-sm text-primary-theme block mt-1 font-serif">
                        G K Builders, Tiruppalai, Madurai - 625014, Tamil Nadu, India.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 border border-theme flex items-center justify-center bg-secondary-theme rounded flex-shrink-0 select-none">
                      <Mail className="w-4 h-4 text-accent-theme" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-secondary-theme uppercase block select-none">ELECTRONIC REGISTRY ENHANCE</span>
                      <span className="font-sans text-sm text-primary-theme block mt-1 hover:text-accent-theme transition-colors">
                        villwin26@gmail.com
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 border border-theme flex items-center justify-center bg-secondary-theme rounded flex-shrink-0 select-none">
                      <Phone className="w-4 h-4 text-accent-theme" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-secondary-theme uppercase block select-none">DIRECT VOICE LINK</span>
                      <span className="font-sans text-sm text-primary-theme block mt-1 hover:text-accent-theme transition-colors">
                        +91 94432 16553
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimalist Embedded Map Placeholder */}
              <div className="mt-12 border border-theme rounded overflow-hidden aspect-[16/7] relative bg-neutral-100 select-none group">
                <div className="absolute inset-0 bg-neutral-900/5 hover:bg-transparent transition-colors z-10 pointer-events-none" />
                <img 
                  src="/src/assets/images/luxury_villa_hero_1779811747915.png" 
                  alt="Madurai Office Map Background View" 
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-102 transition-transform duration-[4s]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-theme to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                  <span className="font-mono text-[10px] text-primary-theme font-bold tracking-widest uppercase">G K OFFICE — TIRUPPALAI</span>
                </div>
              </div>

            </div>

            {/* Right Contact Form / Success State */}
            <div className="border border-theme bg-secondary-theme/40 p-8 lg:p-12 rounded">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in select-none">
                  {/* Outer spinning borders for premium visual */}
                  <div className="w-16 h-16 rounded-full border border-theme flex items-center justify-center bg-primary-theme mb-6 relative">
                    <div className="absolute inset-0 rounded-full border border-t-accent-theme border-b-transparent border-r-transparent border-l-transparent animate-spin" />
                    <Check className="w-6 h-6 text-accent-theme" />
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-serif text-primary-theme mb-3">
                    Aesthetic Inquiry Standardized
                  </h3>
                  <p className="font-sans text-[12px] lg:text-sm text-secondary-theme font-light max-w-md leading-relaxed mb-8">
                    Your luxury structural inquiry has been received. Our chief architectural officer will review your project parameters within 24 working hours.
                  </p>
                  <button 
                    onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', phone: '', projectType: 'Villa', message: '' }); }}
                    className="px-6 py-3 border border-theme bg-primary-theme rounded font-mono text-[9px] tracking-widest text-primary-theme uppercase hover:bg-secondary-theme transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="select-none">
                    <span className="font-mono text-[9px] tracking-widest text-accent-theme uppercase font-semibold block mb-1">PROJECT BLUEPRINT FORUM</span>
                    <h3 className="font-display text-2xl font-serif text-primary-theme mb-6">Request A Blueprint Pitch</h3>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-widest text-secondary-theme uppercase mb-2 select-none">YOUR FULL NAME</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Anand Kumar"
                      className="w-full bg-primary-theme border border-theme px-4 py-3 rounded text-sm focus:outline-none focus:border-accent-theme font-sans transition-all text-primary-theme"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-secondary-theme uppercase mb-2 select-none">EMAIL DIRECTORY</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="e.g. anand@domain.com"
                        className="w-full bg-primary-theme border border-theme px-4 py-3 rounded text-sm focus:outline-none focus:border-accent-theme font-sans transition-all text-primary-theme"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-secondary-theme uppercase mb-2 select-none">PHONE CONTACT</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-primary-theme border border-theme px-4 py-3 rounded text-sm focus:outline-none focus:border-accent-theme font-sans transition-all text-primary-theme"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-widest text-secondary-theme uppercase mb-2 select-none">PROJECT SPECS CATEGORY</label>
                    <select 
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleFormChange}
                      className="w-full bg-primary-theme border border-theme px-4 py-3 rounded text-sm focus:outline-none focus:border-accent-theme font-mono text-[11px] tracking-wider transition-all text-primary-theme"
                    >
                      <option value="Villa">Custom Luxury Villa Design</option>
                      <option value="Apartment">Multi-Unit Apartments Group</option>
                      <option value="Commercial">Flagship Commercial HQ</option>
                      <option value="Interior">Luxury Curated Interiors</option>
                      <option value="Renovation">Specialized Property Renovation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-widest text-secondary-theme uppercase mb-2 select-none">SPECIFICATION DESCRIPTION</label>
                    <textarea 
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Describe your plot dimension, locations, and aesthetic preferences (e.g. 'I own a 2400 sq.ft land site in Tiruppalai hoping to build a Japandi concrete bungalow...')"
                      className="w-full bg-primary-theme border border-theme px-4 py-3 rounded text-sm focus:outline-none focus:border-accent-theme font-sans transition-all text-primary-theme"
                    />
                  </div>

                  {/* Smart detail highlighting preferred design theme context */}
                  <div className="bg-primary-theme/75 border border-theme p-3 rounded flex items-center justify-between select-none font-mono text-[9px] tracking-wide text-secondary-theme">
                    <span>AESTHETIC SYNTAX LINKED</span>
                    <span className="font-bold text-accent-theme uppercase">{activeTheme.name} Mood</span>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-accent-theme text-white font-mono text-[10px] tracking-widest uppercase transition-all duration-300 rounded mx-auto block hover:bg-[var(--color-accent-dark)] shadow-sm font-semibold"
                    onMouseEnter={() => onHoverInteractive('SUBMIT PITCH')}
                    onMouseLeave={() => onHoverInteractive()}
                  >
                    Submit Project Specs
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 14. PRESTIGIOUS FLOATING WHATSAPP CTA */}
      <a 
        href="https://wa.me/919443216553?text=Hello%20GK%20Builders%2C%20I%20visited%20your%20luxury%20website%20and%20would%20like%20to%20consult%20on%20building%20a%20project%20with%20you.%20My%20preferred%20architectural%20mood%20is%20the%20Japandi%20series." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        onMouseEnter={() => onHoverInteractive('WHATSAPP LINK DIRECT')}
        onMouseLeave={() => onHoverInteractive()}
        aria-label="Contact directly on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-2xl text-white" />
        {/* Floating pulse glowing ring */}
        <span className="absolute inset-0 rounded-full border border-emerald-500 animate-ping opacity-60" />
      </a>

      {/* 15. HIGH-END ARCHITECTURAL FOOTER */}
      <footer className="w-full bg-secondary-theme pt-16 pb-12 px-6 lg:px-12 border-t border-theme border-solid select-text">
        <div className="max-w-7xl mx-auto flex flex-col justify-between items-stretch">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline pb-16 border-b border-theme/40">
            {/* Column 1 - Brand Identity block */}
            <div className="md:col-span-5 text-left">
              <div className="flex items-baseline space-x-1 mb-4 select-none">
                <span className="font-display text-2xl lg:text-3xl font-extrabold tracking-widest text-primary-theme">G K</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-theme inline-block" />
              </div>
              <p className="font-sans text-[12px] lg:text-sm text-secondary-theme font-light leading-relaxed max-w-sm mb-6">
                Premium high-end contracting and custom structural architecture studio located in Tiruppalai, Madurai. We transform raw land plots into secure landmarks built for generations.
              </p>
              {/* Media links */}
              <div className="flex items-center space-x-4 select-none">
                {[
                  { name: 'fa-instagram', link: '#' },
                  { name: 'fa-facebook-f', link: '#' },
                  { name: 'fa-pinterest-p', link: '#' },
                  { name: 'fa-linkedin-in', link: '#' }
                ].map((s, idx) => (
                  <a 
                    key={idx}
                    href={s.link}
                    className="w-8 h-8 rounded border border-theme hover:border-accent-theme text-secondary-theme hover:text-accent-theme flex items-center justify-center transition-colors text-xs"
                    aria-label={`GK Builders social element`}
                  >
                    <i className={`fa-brands ${s.name}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Quick navigational mapping */}
            <div className="md:col-span-3 text-left">
              <span className="font-mono text-[9px] tracking-widest text-accent-theme uppercase block mb-4 select-none">STRUCTURE DIRECTORY</span>
              <ul className="space-y-2.5 font-mono text-[10px] tracking-wider uppercase text-secondary-theme">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="hover:text-primary-theme transition-colors">Hero Studio</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="hover:text-primary-theme transition-colors">About G K</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} className="hover:text-primary-theme transition-colors">Capabilities</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }} className="hover:text-primary-theme transition-colors">Masonry Portfolios</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }} className="hover:text-primary-theme transition-colors">Queries FAQ</a></li>
              </ul>
            </div>

            {/* Column 3 - Technical validation data */}
            <div className="md:col-span-4 text-left">
              <span className="font-mono text-[9px] tracking-widest text-accent-theme uppercase block mb-4 select-none">CORPORATION REGISTRY</span>
              <div className="space-y-4 text-xs font-light text-secondary-theme font-sans">
                <p>
                  Our raw materials adhere completely to Indian National Building Codes (NBC) and IS-456 structural concrete practices.
                </p>
                <div className="pt-2 border-t border-theme/40 text-[9px] font-mono tracking-wider text-secondary-theme uppercase select-none">
                  <span>HEAD OFFICE: TIRUPPALAI, MADURAI — 625014</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sub level credits */}
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center text-left text-[10px] font-mono tracking-wider text-secondary-theme uppercase">
            <div>
              <span>© {new Date().getFullYear()} G K BUILDERS MADURAI. ALL COGNITIVE DESIGNS RESERVED.</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0 select-none">
              <a href="#" className="hover:text-primary-theme transition-colors">PRIVACY CODE</a>
              <a href="#" className="hover:text-primary-theme transition-colors">STRUCTURAL WARRANTY Terms</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
