import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext.jsx';

// import 'dayjs/locale/ru.js'
// dayjs.locale('ru')
// // dayjs.startOf('week')


// import ru from 'dayjs/locale/ru';
// dayjs.locale({
//     ...ru,
//     weekStart: 0,
// });

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
          <p className="text-sm mt-1">{day.format('dddd').toUpperCase()}</p>}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
        {day.format('DD')}
        </p>
      </header>
      <div className='flex-1 cursor-pointer' onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}>
        {dayEvents.map((evt, index) => {
          const colorVariants = {
            indigo: 'bg-indigo-400',
            gray: 'bg-gray-400',
            green: 'bg-green-400',
            blue: 'bg-blue-400',
            red: 'bg-red-400',
            purple: 'bg-purple-400'
          }

      return    (
          <div 
            key={index} 
            className={`p-1 mr-3 text-sm rounded mb-1 truncate text-white ${colorVariants[evt.label]}`} 
            // style={{backgroundColor: ``}}
            onClick={() => setSelectedEvent(evt)}
          >
            {evt.title}
          </div>
        )})}
      </div>
    </div>
  )
}
