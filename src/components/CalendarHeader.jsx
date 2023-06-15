import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import GlobalContext from '../context/GlobalContext.jsx'
import dayjs from 'dayjs'

import 'dayjs/locale/ru.js'
dayjs.locale('ru')

// import ru from 'dayjs/locale/ru';
// dayjs.locale({
//     ...ru,

// });
// dayjs.Ls.ru.weekStart = 1;

export default function CalendarHeader() {
const {monthIndex, setMonthIndex} = useContext(GlobalContext)

function handlePrevMonth() {
  setMonthIndex(monthIndex - 1)
}

function handleNextMonth() {
  setMonthIndex(monthIndex + 1)
}

function handleResetMonth() {
  setMonthIndex(dayjs().month() === monthIndex ? monthIndex + Math.random() : dayjs().month())
}

  return (
    <header className='px-4 py-2 flex items-center'>
      <img src={logo} alt="calendar-logo" className='mr-2 w-12 h-12'/>
      <h1 className='mr-10 text-xl text-gray font-bold'>Календарь</h1>
      <button className="border rounded py-2 px-4 mr-5" onClick={() => handleResetMonth()}>
        Сегодня
      </button>
      <button onClick={() => handlePrevMonth()}>
        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
          chevron_left
        </span>
      </button>
      <button onClick={() => handleNextMonth()}>
        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
          chevron_right
        </span>
      </button>
      <h2 className='ml-4 text-xl text-gray-500 font-bold capitalize'>
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  )
}
