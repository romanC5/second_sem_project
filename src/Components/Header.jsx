import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import Logo from '../assets/Logo1.png';
import { useSearchProductsQuery } from '../services/dummyApi';
import { getImageUrl } from '@/lib/utils';

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);

  // Always sync userInfo from localStorage on mount, on storage event, and on custom userInfoChanged event
  useEffect(() => {
    const syncUserInfo = () => {
      try {
        const userStr = localStorage.getItem('userInfo');
        if (userStr) setUserInfo(JSON.parse(userStr));
        else setUserInfo(null);
      } catch { setUserInfo(null); }
    };
    syncUserInfo(); // On mount
    window.addEventListener('storage', syncUserInfo);
    window.addEventListener('userInfoChanged', syncUserInfo);
    return () => {
      window.removeEventListener('storage', syncUserInfo);
      window.removeEventListener('userInfoChanged', syncUserInfo);
    };
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  const { data, error, isLoading } = useSearchProductsQuery(searchTerm, {
    skip: !searchTerm, 
  });


  // Update searchTerm from URL if on Home page and ?q= is present
  React.useEffect(() => {
    if (location.pathname === '/' && location.search.includes('q=')) {
      const params = new URLSearchParams(location.search);
      setSearchTerm(params.get('q') || '');
    }
  }, [location]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowResults(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleProductClick = () => {
    setSearchTerm('');
    setShowResults(false);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  // ✅ Combined useEffect to handle clicks outside of the search and mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search results if click is outside the search component
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
      // Close mobile menu if click is outside the mobile menu component
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []); // Empty dependency array ensures this runs only once

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-md fixed z-50 top-0 w-full">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex items-center gap-3">
              <img className="h-10 w-10" src={Logo} alt="Kinmel Logo" />
              <h2 className="sm:block text-2xl md:text-3xl font-bold text-black">
                Kinmel
              </h2>
            </div>
          </Link>

          {/* Search Bar (Visible on all screen sizes) */}
          <div ref={searchRef} className="relative flex-1 max-w-2xl mx-2 md:mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setShowResults(true)}
                onKeyDown={handleSearchKeyDown}
                className="w-full pr-10 pl-4 py-3 bg-search-bg border border-search-border rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           text-foreground placeholder-muted-foreground transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => {
                  if (searchTerm.trim()) {
                    navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
                    setShowResults(false);
                  }
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground focus:outline-none cursor-pointer"
                tabIndex={-1}
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {isLoading && (
                    <div className="p-4 text-center text-muted-foreground">Searching...</div>
                )}
                {error && (
                    <div className="p-4 text-center text-destructive">Error searching</div>
                )}
                {data?.products?.length > 0 ? (
                  <div>
                    {data.products.map((product) => (
                      <Link 
                        to={`/product/${product._id}`}
                        key={product._id}
                        onClick={handleProductClick}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-accent transition-colors duration-200 border-b last:border-b-0"
                      >
                        <img 
                          src={getImageUrl(product.images?.[0], 'https://via.placeholder.com/50')} 
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md bg-muted"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-card-foreground truncate">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">Rs. {product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  !isLoading && <div className="p-4 text-center text-muted-foreground">No products found</div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Icons (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0 gap-5">
            {userInfo ? (
              <Link to="/account" className="text-black hover:text-gray-600 transition-colors duration-300 p-2">
                {userInfo.image ? (
                  <img
                    src={userInfo.image}
                    alt="Account"
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                  />
                ) : (
                  <FiUser size={24} />
                )}
              </Link>
            ) : (
              <Link to="/login_Signup" className="text-black hover:text-gray-600 transition-colors duration-300 p-2">
                <FiUser size={24} />
              </Link>
            )}
            <Link to="/cart" className="text-black hover:text-gray-600 transition-colors duration-300 relative p-2">
              <FiShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            </Link>
          </div>
          
          {/* Hamburger Menu Toggle (Visible on mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-black p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </nav>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden bg-white border-t border-border">
            <div className="flex flex-col px-4 py-3 space-y-3">
              <Link to={userInfo ? "/account" : "/login_Signup"} onClick={handleProductClick} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                <FiUser size={22} className="text-muted-foreground" />
                <span className="font-medium">My Account</span>
              </Link>
              <Link to="/cart" onClick={handleProductClick} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                <FiShoppingCart size={22} className="text-muted-foreground" />
                <span className="font-medium">Shopping Cart</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;