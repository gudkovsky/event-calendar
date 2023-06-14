import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar.jsx'
import Labels from './Labels.jsx'


export default function Sidebar() {
  return (
    <aside className='border p-5 w-64'>
      <CreateEventButton />
      <SmallCalendar /> 
      <Labels />
    </aside>
  )
}
