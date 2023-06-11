import React from 'react'

export default function Day({day}) {
  return (
    <div>
      {
        day.format()
        // встроенный метод dayjs
      }
    </div>
  )
}
