
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BloomSync. Analyzing ecosystem health for a better future.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
