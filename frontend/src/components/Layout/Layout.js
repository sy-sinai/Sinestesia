import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar toggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar 
        isOpen={sidebarOpen} 
        closeSidebar={() => setSidebarOpen(false)} 
      />
      <main className="min-h-screen">{children}</main>
    </>
  );
}