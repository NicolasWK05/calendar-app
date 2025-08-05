import {
  Component,
  inject,
  Inject,
  Input,
  signal,
  WritableSignal,
} from "@angular/core";
import { CalendarDayComponent } from "../calendar-day/calendar-day.component";
import { CommonModule } from "@angular/common";
import { CalendarNavComponent } from "../calendar-nav/calendar-nav.component";
import { CalendarService } from "@/calendar.service";
import { WINDOW } from "src/WINDOW";
import { UserService } from "@/user.service";
import IUser from "@/Interfaces/IUser";
import { Router } from "@angular/router";

@Component({
  selector: "app-calendar",
  imports: [CalendarDayComponent, CommonModule, CalendarNavComponent],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.css",
  // providers: [CalendarService, Router], // NOTE - Only provide if you want a local CalendarService (Scary stuff here) 
})
export class CalendarComponent {
  // private userService = inject(UserService)
  private calendarService = inject(CalendarService);
  constructor(
    @Inject(WINDOW) private window: Window,
    private userService: UserService,
    private router: Router,
  ) {}

  @Input() calendarId: number = 0;

  User: WritableSignal<IUser | null> = signal(null);

  date: Date = new Date(Date.now());
  days: Date[] = [];
  month: number = this.date.getMonth() + 1;

  daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  ngOnInit() {
    const daycount = this.daysInMonth(this.month, this.date.getFullYear());
    for (let i = 1; i <= daycount; i++) {
      this.days.push(new Date(this.date.getFullYear(), this.month - 1, i));
    }
  }

  async FetchUser() {
    let user = await this.userService.User();
    if (user == null) return; // TODO - Handle user not logged in
    this.User.set(user);

    console.log("User fetched:", user);

    try {
      if (!this.calendarId) {
        console.log(user.UserId);
        const calendar = this.calendarService
          .getUserCalendars(user.UserId)
          .find((c) => c.UserId == user.UserId);
        console.log("Calendar found:", calendar);
        if (calendar) {
          this.window.location.href = `/${calendar.CalendarId}`;
        }
      }
    } catch (error) {
      console.error("Error in ngAfterViewInit:", error);
    }
  }

  ngAfterViewInit() {
    console.log("User Check");
    if (this.User() == null) return;
    let user = this.User() as IUser; // Type assertion since we know User is not null here
  }
  ngAfterContentInit() {
    this.FetchUser(); // Fetch user data after view initialization
  }

  login() {
    this.router.navigate(["/login"])
  }
}
