import React from 'react';
import Navbar from './Navbar'; // Navbar bileşenini buraya ekleyin
import '../styles/Layout.css'

function Layout({ children }) {
  return (
    <div className='layout-container'>
      <Navbar />
      <div className="container">
        {children}
      </div>
      {/* Burada diğer ortak bileşenler de eklenebilir */}
    </div>
  );
}

export default Layout;