import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black opacity-50 text-white py-8 ">
      <div className="container mx-auto px-4 flex items-center justify-center">
        {/* Footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright info */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">&copy; 2024 AstroTechies. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
