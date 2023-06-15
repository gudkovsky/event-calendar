import React, { useContext } from 'react'
import plus from '../assets/plus.svg'
import GlobalContext from '../context/GlobalContext.jsx'

export default function CreateEventButton() {
  const {setShowEventModal} = useContext(GlobalContext)

  return (
   <button 
    className='border p-2 rounded-full flex items-center shadow-md hover:shadow-l' 
    onClick={() => setShowEventModal(true)}
   >
    <img src={plus} alt="create-event" className='w-7 h-7' />
    <span className='pl-3 pr-7'>Событие</span>
   </button>
  )
}
