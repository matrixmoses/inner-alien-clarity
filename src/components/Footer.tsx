import React from 'react';
import { Mail, X } from "lucide-react";
import { SiteMap } from './SiteMap';

export const Footer = () => {
  return (
    <footer className="bg-[#9C8ADE]/10 py-8">
      <div className="container mx-auto px-4">
        <div className="mt-8 border-t border-gray-200 pt-8">
          <SiteMap />
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} TheInnerAlien.co. All rights reserved.
        </div>
      </div>
    </footer>
  );
};