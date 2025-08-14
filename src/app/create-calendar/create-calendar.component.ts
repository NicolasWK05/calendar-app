import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarService } from '@/calendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrl: './create-calendar.component.css',
  imports: [FormsModule],
})
export class CreateCalendarComponent {
  constructor(private calendarService: CalendarService, private router: Router) {}
  calendarName = '';
  
  onSubmit() {
    this.calendarService.createCalendar(this.calendarName)
      .then(() => {
        console.log('Calendar created successfully');
        // this.router.navigate(['/']);
      })
      .catch(err => {
        console.error('Error creating calendar:', err);
      });
  }
}