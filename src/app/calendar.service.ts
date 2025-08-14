import { Injectable } from '@angular/core';
import ICalendar from '@/Interfaces/ICalendar';
import axios from 'axios';
import IEvent from '@/Interfaces/IEvent';

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

  async getUserCalendars(userId: number): Promise<ICalendar[]> {
    userId = parseInt(userId.toString()); // Ensure userId is a number
    const token = localStorage.getItem('token'); // Get token from local storage

    let s = await axios.get<{
      calendarId: number;
      calendarName: string;
      userid: number;
    }[]>(`/Calendar`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
    });

    let calendars = s.data.map((item) => ({
      CalendarId: item.calendarId,
      CalendarName: item.calendarName,
      UserId: item.userid
    }));

    return calendars;
  }

  async createCalendar(name: String): Promise<ICalendar> {
    const token = localStorage.getItem('token'); // Get token from local storage

    let s = await axios.post<ICalendar>(`/Calendar`, {
      CalendarName: name
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    });

    return s.data;
  }

    async getEvents(calendarId: number, month: number, year: number): Promise<IEvent[] | null> {
      const token = localStorage.getItem('token');
      if (!token) return null;
      // Convert to number if calendarId is a string
      if (typeof calendarId === "string") {
        calendarId = parseInt(calendarId);
      }

      // RFC 3339 date formats
      const startDate = new Date(Date.UTC(year, month, 1)).toISOString();
      const endDate = new Date(Date.UTC(year, month + 1, 0)).toISOString();

      const res = await axios.get<IEvent[]>(`/Calendar/${calendarId}/events/range`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      });

      return res.data;
  }
}
