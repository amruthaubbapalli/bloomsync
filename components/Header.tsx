
import React from 'react';
import { View } from '../types';
import { NAV_ITEMS } from '../constants';
import Icon from './common/Icon';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Icon name="logo" className="h-8 w-8 text-emerald-500" />
            <span className="ml-2 text-2xl font-bold text-gray-800 tracking-tight">Bloom<span className="text-emerald-500">Sync</span></span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`text-lg font-medium transition-colors duration-200 ${
                  currentView === item.view
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-500 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
