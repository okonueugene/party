import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Mobile Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 lg:hidden">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <span className="text-lg font-bold text-gray-800">Dashboard</span>
          <div className="w-8" /> {/* Spacer for centering */}
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;