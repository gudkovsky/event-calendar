import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { getMonth } from './util.js'
import CalendarHeader from './components/CalendarHeader.jsx';
import Sidebar from './components/Sidebar.jsx';
import Month from './components/Month.jsx';
import GlobalContext from './context/GlobalContext.jsx';

function App() {
  const [currentMonth, setCurrentMonth] = useState(() => getMonth())
  const {monthIndex} = useContext(GlobalContext)
  
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
   
  return (
    <>
      <div className='h-screen flex flex-col'>
        <CalendarHeader />
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={currentMonth}/>
        </div>

      </div>
    </>
  );
}

export default App;
