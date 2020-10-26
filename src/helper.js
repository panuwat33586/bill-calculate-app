import dayjs from 'dayjs'
import IsBetween from 'dayjs/plugin/isBetween'

dayjs.extend(IsBetween)

export const checkInDuration=(fromDate,toDate,Date)=>{

   return dayjs(Date).isBetween(fromDate, dayjs(toDate),null, '[]')
}

// for date sku mapping
// export const getDateofMonth=(date)=>{
//    return dayjs(date).date()
// }

export const getDateofMonth=(date)=>{
   const currentyear=dayjs().get('year')
   const currentmonth=dayjs().get('month')
   const getdate=dayjs().set('date',date).set('month',currentmonth).set('year',currentyear)
   return  getdate.format('YYYY-MM-DD')
}
