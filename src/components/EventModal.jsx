import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext.jsx'

const labelsColors = ['indigo', 'gray', 'green', 'blue', 'red', 'purple']

export default function EventModal() {
  const {setShowEventModal, daySelected, dispatchCalendarEvent, selectedEvent} = useContext(GlobalContext)

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '')
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '')
  const [labelSelected, setLabelSelected] = useState(selectedEvent ? labelsColors.find((color) => color === selectedEvent.label) 
     : labelsColors[0])
  

  function handleSubmit(evt) {
    evt.preventDefault()
    const calendarEvent = {
      title, 
      description, 
      label: labelSelected, 
      day: daySelected.valueOf(), 
      id: selectedEvent ? selectedEvent.id : Date.now()
    }

    if (selectedEvent) {
      dispatchCalendarEvent({type: 'update', payload: calendarEvent})
    } else {
      dispatchCalendarEvent({type: 'push', payload: calendarEvent})
    }
    setShowEventModal(false)
  }

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
      <form className='bg-white rounded-lg shadow-2xl w-1/4'>
        <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
          <span className='material-icons-outlined text-gray-400'>
            drag_handle
          </span>
          <div> 
            {selectedEvent && (
              <button type='button'
               onClick={() => {
                  dispatchCalendarEvent({type: 'delete', payload: selectedEvent})
                  setShowEventModal(false)
                }}>
                <span className='material-icons-outlined text-gray-400'>
                  delete
                </span>
               </button>
            )}
            <button onClick={() => setShowEventModal(false)}>
                <span className='material-icons-outlined text-gray-400'>
                  close
                </span>
            </button>

          </div>

        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-center gap-y-7">
            <div></div>
            <input 
              className='pt-3 pb-2 w-full border-0 border-b-2 border-gray-200 text-gray-600 text-xl font-semibold focus:outline-none focus:ring-0 focus:border-blue-500' 
              type="text" 
              name="title" 
              value={title}  
              placeholder='Добавить заголовок' 
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
            <span className='material-icons-outlined text-gray-400 text-right pr-5'>
              schedule
            </span>
            <p className='capitalize'>{daySelected.format('dddd, MMMM DD')}</p>
            <span className='material-icons-outlined text-gray-400 text-right pr-5'>
              segment
            </span>
            <input 
              className='pt-3 pb-2 w-full border-0 border-b-2 border-gray-200 text-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500' 
              type="text" 
              name="description" 
              value={description}  
              placeholder='Добавить описание' 
              onChange={(e) => setDescription(e.target.value)} 
              required
            />

            <span className='material-icons-outlined text-gray-400 text-right pr-5'>
              bookmark_border
            </span>
            <div className='flex gap-x-2'>
              {labelsColors.map((label, i) => (
                <span key={i}
                onClick={() => setLabelSelected(label)}
                className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                style={{backgroundColor: `${label}`}}
                >
                  {
                  labelSelected === label &&
                    <span className='material-icons-outlined text-white text-sm'>
                      check
                    </span>
                  }
                </span>
              )
              )}
            </div>
          </div>
        </div>
        <footer className='flex justify-end border-t p-3 mt-5'> 
          <button
            onClick={handleSubmit}
            className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white' 
            type='button'
          >
            Сохранить
          </button>
        </footer>
      </form>
    </div>
  )
}
