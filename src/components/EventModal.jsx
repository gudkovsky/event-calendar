import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext.jsx'

const labelsColors = ['indigo', 'gray', 'green', 'blue', 'red', 'purple']

export default function EventModal() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const {setShowEventModal, daySelected} = useContext(GlobalContext)

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
      <form className='bg-white rounded-lg shadow-2xl w-1/4'>
        <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
          <span className='material-icons-outlined text-gray-400'>
            drag_handle
          </span>
            <button onClick={() => setShowEventModal(false)}>
              <span className='material-icons-outlined text-gray-400'>
                close
              </span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input 
              className='pt-3 pb-2 w-full border-0 border-b-2 border-gray-200 text-gray-600 text-xl font-semibold focus:outline-none focus:ring-0 focus:border-blue-500' 
              type="text" 
              name="title" 
              value={title}  
              placeholder='Add title' 
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
            <span className='material-icons-outlined text-gray-400'>
              schedule
            </span>
            <p>{daySelected.format('dddd, MMMM DD')}</p>
            <span className='material-icons-outlined text-gray-400'>
              segment
            </span>
            <input 
              className='pt-3 pb-2 w-full border-0 border-b-2 border-gray-200 text-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500' 
              type="text" 
              name="description" 
              value={description}  
              placeholder='Add description' 
              onChange={(e) => setDescription(e.target.value)} 
              required
            />

            <span className='material-icons-outlined text-gray-400'>
              bookmark_border
            </span>
            <div className='flex gap-x-2'>
              {labelsColors.map((label, i) => (
                <span key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                style={{backgroundColor: `${label}`}}
                >
                  <span className='material-icons-outlined text-white text-sm'>
                    check
                  </span>
                </span>
              )
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
