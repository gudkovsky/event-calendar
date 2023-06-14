import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { getMonth } from './util.js'
import CalendarHeader from './components/CalendarHeader.jsx';
import Sidebar from './components/Sidebar.jsx';
import Month from './components/Month.jsx';
import GlobalContext from './context/GlobalContext.jsx';
import EventModal from './components/EventModal.jsx';

function App() {
  const [currentMonth, setCurrentMonth] = useState(() => getMonth())
  const {monthIndex, showEventModal} = useContext(GlobalContext)
  
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
   
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className='h-screen flex flex-col'>
        <CalendarHeader />
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={currentMonth}/>
        </div>

      </div>
    </React.Fragment>
  );
}

export default App;
