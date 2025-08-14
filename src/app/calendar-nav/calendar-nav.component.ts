import { Component } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CommonModule } from '@angular/common';
import ICalendar from '@/Interfaces/ICalendar';
import { UserService } from '@/user.service';
import { Router } from '@angular/router';
import IUser from '@/Interfaces/IUser';

@Component({
  selector: 'app-calendar-nav',
  imports: [CommonModule],
  templateUrl: './calendar-nav.component.html',
  styleUrl: './calendar-nav.component.css'
})
export class CalendarNavComponent {
    constructor(
    // @Inject(WINDOW) private window: Window,
    private userService: UserService,
    private router: Router,
  ) {}

  calendarList: ICalendar[] = [];
  calendarService: CalendarService = new CalendarService();
  user: IUser | null = null;

  async ngOnInit() {

    let user = await this.userService.User();
    if (user) {
      this.user = user;
    }

    if (this.user) {
      this.calendarList = await this.calendarService.getUserCalendars(this.user?.UserId);
    }
  }

  onCalendarSelected(calendar: ICalendar) {
    this.router.navigate([`/${calendar.CalendarId}`]);
  }

}