import React from 'react';
import { Link } from 'react-router-dom';

export const SiteMap = () => {
  return (
    <div className="grid gap-8 md:grid-cols-4">
      <div>
        <h3 className="mb-4 font-semibold text-gray-900">Main</h3>
        <nav className="space-y-2">
          <Link to="/" className="block hover:text-[#9C8ADE]">Home</Link>
          <Link to="/blog" className="block hover:text-[#9C8ADE]">Blog</Link>
        </nav>
      </div>
      <div>
        <h3 className="mb-4 font-semibold text-gray-900">Legal</h3>
        <nav className="space-y-2">
          <Link to="/privacy-policy" className="block hover:text-[#9C8ADE]">Privacy Policy</Link>
          <Link to="/terms-of-service" className="block hover:text-[#9C8ADE]">Terms of Service</Link>
        </nav>
      </div>
      <div>
        <h3 className="mb-4 font-semibold text-gray-900">Support</h3>
        <nav className="space-y-2">
          <a href="mailto:YourInnerAlien@gmail.com" className="block hover:text-[#9C8ADE]">Contact Us</a>
          <a href="https://discord.gg/shfZkcHx" target="_blank" rel="noopener noreferrer" className="block hover:text-[#9C8ADE]">Discord Community</a>
        </nav>
      </div>
      <div>
        <h3 className="mb-4 font-semibold text-gray-900">Follow Us</h3>
        <nav className="space-y-2">
          <a href="https://x.com/MyInnerAlien" target="_blank" rel="noopener noreferrer" className="block hover:text-[#9C8ADE]">X (Twitter)</a>
        </nav>
      </div>
    </div>
  );
};