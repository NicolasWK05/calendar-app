import { Component, Inject, Input } from '@angular/core';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { CommonModule } from '@angular/common';
import { CalendarNavComponent } from '../calendar-nav/calendar-nav.component';
import { CalendarService } from '@/calendar.service';
import { WINDOW } from 'src/WINDOW';

@Component({
  selector: 'app-calendar',
  imports: [CalendarDayComponent, CommonModule, CalendarNavComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  constructor(@Inject(WINDOW) private window: Window) {
    // Constructor logic here
  }

  // Bind the calendarId to the calendar component
  // Gotten from the route params
  @Input() calendarId: number = 0;
  
  userId: number = 1; // TODO - Get this from the user service 

  date: Date = new Date(Date.now());
  days: Date[] = [];
  month: number = this.date.getMonth() + 1;
  
  daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  }

  ngOnInit() {

    
    

    const daycount = this.daysInMonth(this.month, this.date.getFullYear());
    for (let i = 1; i <= daycount; i++) {
      this.days.push(new Date(this.date.getFullYear(), this.month - 1, i));
    }
    // console.log(this.calendarId);
  }

  ngAfterViewInit() {
    try {
      if (this.calendarId == 0 || this.calendarId == undefined) { 
        let calenderService = new CalendarService();
        let calendar = calenderService.getUserCalendars(this.userId).find(c => c.UserId == this.userId); // Get the first calender belonging to the user.
        this.window.location.href = `/${calendar?.CalendarId}`;
        return;
      }
    } catch (error) {
      console.error('Error in ngAfterViewInit:', error); // Not sure why it says window is not defined
    }
  }
}

// This component is responsible for displaying the calendar.