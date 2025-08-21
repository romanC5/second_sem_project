import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import Logo from '../assets/Logo1.png';
import { useSearchProductsQuery } from '../services/dummyApi';
import { Link } from 'react-router';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const { data, error, isLoading, isError } = useSearchProductsQuery(searchTerm);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleProductClick = (product) => {
    console.log('Selected product:', product);
    setSearchTerm('');
    setShowResults(false);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-brand-red to-brand-red-dark shadow-lg mb-16 fixed z-50 top-0 w-full bg-white">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4 gap-4">
          
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <div className="flex items-center gap-3">
              <img className="h-10 w-10 cursor-pointer" src={Logo} alt="Kinmel Logo" />
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground tracking-tight cursor-pointer">
                Kinmel
              </h2>
            </div>
          </a>

          {/* Search Bar with Results */}
          <div ref={searchRef} className="relative flex-1 max-w-2xl mx-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setShowResults(true)}
                className="w-full pl-10 pr-4 py-3 bg-search-bg border border-search-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         text-foreground placeholder-muted-foreground transition-all duration-300"
              />
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border bg-white
                            rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {isLoading && (
                  <div className="p-4 text-center text-muted-foreground">
                    <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    Searching...
                  </div>
                )}
                
                {isError && (
                  <div className="p-4 text-center text-destructive">
                    Error: {error?.message || 'Search failed'}
                  </div>
                )}
                
                {data && data.products && data.products.length > 0 && (
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
                      Found {data.products.length} result{data.products.length !== 1 ? 's' : ''}
                    </div>
                    {data.products.map((product) => (
                      <Link to={`/product/${product.id}`}
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground 
                                 transition-colors duration-200 border-border last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.thumbnail} 
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded-md bg-muted"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-card-foreground truncate">{product.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-muted-foreground">{product.category}</span>
                              <span className="text-sm font-semibold text-primary">${product.price}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {data && data.products && data.products.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    No products found for "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            <button 
              className="text-primary-foreground hover:text-primary-glow transition-colors duration-300 relative cursor-pointer p-2"
              aria-label="User account"
            >
              <FiUser size={24} />
            </button>
            
            <Link to="/cart" 
              className="text-primary-foreground hover:text-primary-glow transition-colors duration-300 relative cursor-pointer p-2"
              aria-label="Shopping cart"
            >
              <FiShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-primary-foreground text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                0
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;