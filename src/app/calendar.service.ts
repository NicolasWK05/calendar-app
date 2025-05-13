import { Injectable } from '@angular/core';
import ICalendar from '@/Interfaces/ICalendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  getCalendar(): ICalendar {
    return {
      CalendarId: 1,
      UserId: 1,
      CalendarName: 'My Calendar'
    }
  }

  getUserCalendars(userId: number): ICalendar[] {
    return calendars.filter(calendar => calendar.UserId === userId);
  }
}


const calendars: ICalendar[] = [
  {
    CalendarId: 1,
    UserId: 1,
    CalendarName: 'My Calendar'
  },
  {
    CalendarId: 2,
    UserId: 1,
    CalendarName: 'Work Calendar'
  },
  {
    CalendarId: 3,
    UserId: 2,
    CalendarName: 'Family Calendar'
  },
  {
    CalendarId: 4,
    UserId: 1,
    CalendarName: 'Holidays Calendar'
  },
];