import { Component } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CommonModule } from '@angular/common';
import ICalendar from '@/Interfaces/ICalendar';

@Component({
  selector: 'app-calendar-nav',
  imports: [CommonModule],
  templateUrl: './calendar-nav.component.html',
  styleUrl: './calendar-nav.component.css'
})
export class CalendarNavComponent {

  calendarList: ICalendar[] = [];
  calendarService: CalendarService = new CalendarService();

  ngOnInit() {
    this.calendarList = this.calendarService.getUserCalendars(1); // TODO - Get user ID from auth service
    // console.log(this.calendarList);
  }

  onCalendarSelected(calendar: ICalendar) {
    window.location.href = `/${calendar.CalendarId}`;
  }

}