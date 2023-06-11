import React, { useState } from 'react';
import './App.css';
import { getMonth } from './util.js'
import CalendarHeader from './components/CalendarHeader.jsx';
import Sidebar from './components/Sidebar.jsx';
import Month from './components/Month.jsx';

function App() {
  const [currentMonth, setCurrentMonth] = useState(() => getMonth())
  return (
    <>
      <div className='h-screen flex flex-columns'>
      <CalendarHeader />
      <div className='flex flex-1'></div>
        <Sidebar />
        <Month month={currentMonth}/>
      </div>
    </>
  );
}

export default App;
