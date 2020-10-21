import dayjs from 'dayjs'
import IsBetween from 'dayjs/plugin/isBetween'

dayjs.extend(IsBetween)

export const checkInDuration=(fromDate,toDate,Date)=>{

   return dayjs(Date).isBetween(fromDate, dayjs(toDate),null, '[]') 
}