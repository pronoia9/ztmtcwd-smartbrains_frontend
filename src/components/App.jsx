import React from 'react';
import './App.css';
import Preloader from './Preloader/Preloader';
import Navbar from './Navbar/Navbar';

export default function App() {
  return (
    <div className='__next'>
      <Preloader />
      <Navbar />
    </div>
  );
}
