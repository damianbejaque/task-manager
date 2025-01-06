import { format } from 'date-fns' // Import the date-fns library

export const formattedDate = (date: Date) =>
  format(new Date(date), 'MMM dd, yyyy - hh:mm a')
