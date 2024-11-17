import React from 'react';
import { Mail, X } from "lucide-react";

export const BlogFooter = () => {
  return (
    <footer className="bg-[#9C8ADE]/10 py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Contact Us</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:YourInnerAlien@gmail.com" className="hover:text-[#9C8ADE]">
                  YourInnerAlien@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <X className="h-4 w-4" />
                <a href="https://x.com/MyInnerAlien" target="_blank" rel="noopener noreferrer" className="hover:text-[#9C8ADE]">
                  @MyInnerAlien
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} TheInnerAlien.co. All rights reserved.
        </div>
      </div>
    </footer>
  );
};