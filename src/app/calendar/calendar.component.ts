import {
  Component,
  inject,
  Inject,
  Input,
  signal,
  WritableSignal,
  ViewChild,
} from "@angular/core";
import { CalendarDayComponent } from "../calendar-day/calendar-day.component";
import { CommonModule } from "@angular/common";
import { CalendarNavComponent } from "../calendar-nav/calendar-nav.component";
import { CreateEventModalComponent, CreateEventRequest } from "../create-event-modal/create-event-modal.component";
import { CalendarService } from "@/calendar.service";
import { EventService } from "@/event.service";
import { WINDOW } from "src/WINDOW";
import { UserService } from "@/user.service";
import IUser from "@/Interfaces/IUser";
import { Router } from "@angular/router";
import IEvent from "@/Interfaces/IEvent";

@Component({
  selector: "app-calendar",
  imports: [CalendarDayComponent, CommonModule, CalendarNavComponent, CreateEventModalComponent],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.css",
})
export class CalendarComponent {
  
  constructor(
    @Inject(WINDOW) private window: Window,
    private userService: UserService,
    private router: Router,
    private calendarService: CalendarService,
    private eventService: EventService
  ) {}
  
  @Input() calendarId: number = 0;
  @ViewChild(CreateEventModalComponent) createEventModal?: CreateEventModalComponent;
  
  User: WritableSignal<IUser | null> = signal(null);
  
  // Track current displayed month and year
  currentMonth: WritableSignal<number> = signal(new Date().getMonth());
  currentYear: WritableSignal<number> = signal(new Date().getFullYear());
  
  // Modal state
  showCreateEventModal: WritableSignal<boolean> = signal(false);
  selectedDateForEvent: WritableSignal<Date | undefined> = signal(undefined);
  
  days: Date[] = [];
  events: IEvent[] | null = null;
  
  // Month names for display
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  // Generate days for the current month
  generateDaysForMonth() {
    this.days = [];
    const daycount = this.daysInMonth(this.currentMonth() + 1, this.currentYear());
    for (let i = 1; i <= daycount; i++) {
      this.days.push(new Date(this.currentYear(), this.currentMonth(), i));
    }
  }

  // Navigation methods
  goToPreviousMonth() {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.set(this.currentYear() - 1);
    } else {
      this.currentMonth.set(this.currentMonth() - 1);
    }
    this.generateDaysForMonth();
    this.getEvents(); // Refresh events when month changes
  }

  goToNextMonth() {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.set(this.currentYear() + 1);
    } else {
      this.currentMonth.set(this.currentMonth() + 1);
    }
    this.generateDaysForMonth();
    this.getEvents(); // Refresh events when month changes
  }

  goToCurrentMonth() {
    const now = new Date();
    this.currentMonth.set(now.getMonth());
    this.currentYear.set(now.getFullYear());
    this.generateDaysForMonth();
    this.getEvents(); // Refresh events when month changes
  }

  // Get formatted month/year string
  getCurrentMonthYear(): string {
    return `${this.monthNames[this.currentMonth()]} ${this.currentYear()}`;
  }

  // Event creation methods
  openCreateEventModal(selectedDate?: Date) {
    if (!this.calendarId) {
      console.error('No calendar ID available');
      return;
    }
    
    this.selectedDateForEvent.set(selectedDate);
    this.showCreateEventModal.set(true);
  }

  closeCreateEventModal() {
    this.showCreateEventModal.set(false);
    this.selectedDateForEvent.set(undefined);
  }

  async createEvent(eventRequest: CreateEventRequest) {
    // try {
    //   console.log('Creating event:', eventRequest);
      
    //   // Call your event service to create the event
    //   const response = await fetch('http://localhost:5168/api/Event', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // Add authorization header if needed
    //       // 'Authorization': `Bearer ${your_token}`
    //     },
    //     body: JSON.stringify(eventRequest)
    //   });

    //   if (response.ok) {
    //     console.log('Event created successfully');
    //     this.createEventModal?.setSubmittingComplete();
    //     this.closeCreateEventModal();
    //     this.getEvents(); // Refresh events after creation
        
    //     // Show success message (you can implement a toast service)
    //     console.log('Event created successfully!');
    //   } else {
    //     const errorData = await response.json();
    //     console.error('Error creating event:', errorData);
    //     this.createEventModal?.setError(errorData.message || 'Failed to create event');
    //   }
    // } catch (error) {
    //   console.error('Error creating event:', error);
    //   this.createEventModal?.setError('Failed to create event. Please try again.');
    // }
  }

  ngOnInit() {
    this.generateDaysForMonth();

    // We don't want invalid calendar IDs
    if (isNaN(this.calendarId) && this.calendarId !== undefined) {
      this.router.navigate(["/"]);
    }
  }

  async FetchUser() {
    let user = await this.userService.User();
    if (user == null) return;
    this.User.set(user);
    console.log("User fetched:", user);
    if (this.calendarId) return;
    try {
      console.log(user.UserId);
      const calendar = (await this.calendarService
        .getUserCalendars(user.UserId))
        .find((c) => c.UserId == user.UserId);
       
      console.log("Calendar found:", calendar);
      if (calendar) {
        this.window.location.href = `/${calendar.CalendarId}`;
      } else {
        console.log("No calendar found for user, redirecting to create calendar.");
      }
    } catch (error) {
      console.error("Error in ngAfterViewInit:", error);
    }
  }

  getEvents() {
    if (!this.calendarId) return;

    this.calendarService.getEvents(this.calendarId, this.currentMonth(), this.currentYear()).then(events => {
      this.events = events;
      console.log("Events fetched:", events);
    });
  }

  ngAfterContentInit() {
    this.FetchUser();
    this.getEvents(); // Fetch events for the current month
  }

  login() {
    this.router.navigate(["/login"])
  }
}