import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getMonth } from '../util.js'
import GlobalContext from '../context/GlobalContext.jsx'


export default function SmallCalendar() {
const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
const [currentMonth, setCurrentMonth] = useState(getMonth())

useEffect(() => {
  setCurrentMonth(getMonth(currentMonthIndex))
}, [currentMonthIndex])

const {monthIndex, setSmallCalendarMonth, daySelected, setDaySelected} = useContext(GlobalContext)

useEffect(() => {
  setCurrentMonthIndex(monthIndex)
}, [monthIndex])

function handlePrevMonth() {
  setCurrentMonthIndex(currentMonthIndex - 1)
}

function handleNextMonth() {
  setCurrentMonthIndex(currentMonthIndex - 1)
}

function getDayClass(day) {
  const format = 'DD-MM-YY'
  const dayNow = dayjs().format(format)
  const dayCurrent = day.format(format)
  const chosenDay = daySelected && daySelected.format(format)

  if (dayNow === dayCurrent) {
    return 'bg-blue-500 rounded-full text-white'
  } else if (dayCurrent === chosenDay) {
    return 'bg-blue-100 rounded-full text-blue-600 font-bold';
  } else {
    return '';
  }
}

  return (
    <div className='mt-9'>
      <header className='flex justify-between'>
        <p className='text-gray-500 font-bold capitalize'>
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format('MMMM YYYY')}
        </p>
        <div>
          <button onClick={() => {
            handlePrevMonth()
          }}>
            <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
              chevron_left
            </span>
          </button>
          <button onClick={() => {
            handleNextMonth()
          }}>
            <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
              chevron_right
            </span>
          </button>
        </div>

      </header>
      <div className='grid grid-cols-7 grid-rows-6'>
        {currentMonth[0].map((day, index) => (
          <span className='text-sm py-1 text-center capitalize' key={index}>
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx} 
                className={`py-1 w-full ${getDayClass(day)}`} 
                 onClick={() => {
                  setSmallCalendarMonth(currentMonthIndex);
                  setDaySelected(day)
                 }}
               >
                <span className='text-sm'>{day.format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
