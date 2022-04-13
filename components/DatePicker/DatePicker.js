import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'

export default function  DatePickerX(){
  const [date, setDate] = useState(new Date())

  return <DatePicker style={{height: 100}} date={date} onDateChange={setDate} />
}