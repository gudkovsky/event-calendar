import React, { useEffect, useMemo, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext.jsx'
import dayjs from 'dayjs'

function savedEventsReducer(state, {type, payload}) {
  switch (type) {
    case 'push':
      return [...state, payload]
    case 'update':
      return state.map(evt => evt.id === payload.id ? payload : evt)
    case 'delete':
      return state.filter(evt => evt.id !== payload.id)
  
    default:
      throw new Error()
  }
}

function initializeEvents() {
  const storageEvents = localStorage.getItem('savedEvents')
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
  return parsedEvents
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month())
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [daySelected, setDaySelected] = useState(dayjs())
  const [showEventModal, setShowEventModal] = useState(false)
  const [labels, setLabels] = useState([])
  const [savedEvents, dispatchCalendarEvent] = useReducer(savedEventsReducer, [], initializeEvents)

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
       labels.filter((lbl) => lbl.checked)
       .map(lbl => lbl.label)
       .includes(evt.label)
    )
  }, [savedEvents, labels])

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
  }, [savedEvents])

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set( savedEvents.map(evt => evt.label))].map(label => {
        const currentLabel = prevLabels.find(item => item.label === label)

        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        }
      })
    })
  }, [savedEvents])

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth)
    }
  }, [smallCalendarMonth])

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null)
    }
  }, [showEventModal])

  function updateLabel(label) {
    setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
  }

  return (
    <GlobalContext.Provider value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalendarEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        setLabels,
        labels,
        updateLabel,
        filteredEvents
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
