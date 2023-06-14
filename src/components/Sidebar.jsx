import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar.jsx'

export default function Sidebar() {
  return (
    <aside className='border p-5 w-64'>
      <CreateEventButton />
      <SmallCalendar /> 
    </aside>
  )
}
