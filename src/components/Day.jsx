import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext.jsx';

export default function Day({day, rowIndex}) {
  const {setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent} = useContext(GlobalContext)

  const [dayEvents, setDayEvents] = useState([])
  useEffect(() => {
    const events = filteredEvents.filter(evt => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY'))
      setDayEvents(events)
  }, [filteredEvents, day])

  function getCurrentDayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? `bg-blue-600 text-white rounded-full w-7` : ''
  }

  return (
    <div className='border border-gray-200 flex flex-col'>
      <header className='flex flex-col items-center'>
        {rowIndex === 0 &&
          <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
        {day.format('DD')}
        </p>
      </header>
      <div className='flex-1 cursor-pointer' onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}>
        {dayEvents.map((evt, index) => (
          <div 
            key={index} 
            className={`p-1 mr-3 text-sm rounded mb-1 truncate text-white`} 
            style={{backgroundColor: `${evt.label}`}}
            onClick={() => setSelectedEvent(evt)}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  )
}
