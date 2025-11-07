import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTruck, 
  faShieldHalved,
  faRotateLeft,
  faStar,
  faGem,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-32 overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/6667349/6667349-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/2 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Premium Badge */}
          <div className="flex justify-center mb-8">
            <div className="border border-white/30 backdrop-blur-sm rounded-full px-8 py-3 flex items-center gap-3 group hover:bg-white/10 transition-all duration-500">
              <FontAwesomeIcon icon={faGem} className="text-white group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-light tracking-widest uppercase">Exclusive Collection</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-7xl font-light mb-8 tracking-tight">
            Welcome to<br />
            <span className="font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              TrendNest
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Discover curated essentials that define modern elegance. 
            Where exceptional quality meets timeless design.
          </p>
          
          {/* CTA Button */}
          <Link
            to="/products"
            className="group inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-none font-medium hover:bg-gray-100 transition-all duration-500 hover:scale-105 border border-white/20 backdrop-blur-sm"
          >
            <span>Discover Collection</span>
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="transform group-hover:translate-x-2 transition-transform duration-300" 
            />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-black mb-6 tracking-tight">
              The TrendNest Experience
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Meticulously crafted services designed for the discerning shopper
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group text-center p-12 border border-gray-100 hover:border-black transition-all duration-700 hover:shadow-2xl bg-white">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <FontAwesomeIcon icon={faTruck} className="text-white text-3xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-black rounded-full flex items-center justify-center border-4 border-white">
                  <FontAwesomeIcon icon={faStar} className="text-white text-sm" />
                </div>
              </div>
              <h3 className="text-2xl font-medium text-black mb-6 tracking-wide">Express Delivery</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                Complimentary expedited shipping on all orders. Receive your carefully selected items within 48 hours.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group text-center p-12 border border-gray-100 hover:border-black transition-all duration-700 hover:shadow-2xl bg-white">
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <FontAwesomeIcon icon={faShieldHalved} className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-medium text-black mb-6 tracking-wide">Secure Transactions</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                Your privacy and security are paramount. Advanced encryption protects every transaction with precision.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group text-center p-12 border border-gray-100 hover:border-black transition-all duration-700 hover:shadow-2xl bg-white">
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <FontAwesomeIcon icon={faRotateLeft} className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-medium text-black mb-6 tracking-wide">Seamless Returns</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                60-day return policy with immediate processing. Your complete satisfaction is our commitment.
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-24 text-center">
            <p className="text-gray-500 mb-12 text-sm uppercase tracking-widest font-light">
              Trusted by Elite Clientele Worldwide
            </p>
            <div className="flex justify-center items-center gap-16">
              <div className="text-center">
                <div className="text-4xl font-light text-black mb-2">4.9</div>
                <div className="w-16 h-px bg-gray-300 mx-auto mb-3"></div>
                <div className="text-gray-500 text-sm font-light">Excellence Rating</div>
              </div>
              <div className="h-16 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-4xl font-light text-black mb-2">150K+</div>
                <div className="w-16 h-px bg-gray-300 mx-auto mb-3"></div>
                <div className="text-gray-500 text-sm font-light">Collections Delivered</div>
              </div>
              <div className="h-16 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-4xl font-light text-black mb-2">24/7</div>
                <div className="w-16 h-px bg-gray-300 mx-auto mb-3"></div>
                <div className="text-gray-500 text-sm font-light">Concierge Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;