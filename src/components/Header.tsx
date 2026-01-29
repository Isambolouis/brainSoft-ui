import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Menu, X, User } from 'lucide-react';

export function Header() {
  const { user, isAuthenticated, logout } = useUser();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
  ];

  const userLinks = [
    { path: '/dashboard', label: 'Tableau de bord' },
    { path: '/credit/new', label: 'Demander un crédit' },
    { path: '/repayment', label: 'Remboursement' },
    { path: '/settings', label: 'Paramètres' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm shadow-light">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-text-primary">RawFinance Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {userLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">
                      {user?.firstName}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm text-text-secondary hover:text-text-primary"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/signup" className="btn-primary text-sm">
                  Commencer
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  {userLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-base font-medium ${
                        isActive(link.path)
                          ? 'text-primary'
                          : 'text-text-secondary'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-base text-text-secondary"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-base font-medium ${
                        isActive(link.path)
                          ? 'text-primary'
                          : 'text-text-secondary'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/signup"
                    className="btn-primary text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Commencer
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
