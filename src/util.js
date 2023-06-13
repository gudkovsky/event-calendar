import dayjs from 'dayjs'

export function getMonth(month = dayjs().month()) { //изначально - текущий
  const year = dayjs().year() // текущий год, встроенная функция dayjs
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day() // 1й день месяца, .day() выдает индекс дня недели, 0 - воскр, 6 суббота

  console.log(firstDayOfMonth)
  let currentMonthCount = 0 - firstDayOfMonth // счетчик дней в текущем месяце. Начинается с предыдущего

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++
      return dayjs(new Date(year, month, currentMonthCount))
    })
  })
  return daysMatrix
}// здесь мы создаем матрицу дней ПОСТРОЧНО заполняя каждый из 5 массивов СТРОК. Прибавляя +1 к currenTmonthCount каждая строка является продолжением предыдущей