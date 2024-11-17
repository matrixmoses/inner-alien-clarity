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
          <a href="https://discord.gg/shfZkcHx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#9C8ADE]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
            </svg>
            Discord Community
          </a>
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