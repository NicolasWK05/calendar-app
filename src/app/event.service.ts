import { Injectable } from "@angular/core";
import IEvent from "@/Interfaces/IEvent";
import { EventEmitter } from "stream";
import { UserService } from "./user.service";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class EventService {
  constructor(private userService: UserService) {}

  // Method to get all events for a specific calendar
  // Takes calendarId as a parameter and returns an array of events
  async getEvents(calendarId: number): Promise<IEvent[] | null> {
    let token = await this.userService.token();
    if (!token) return null;
    // Convert to number if calendarId is a string
    if (typeof calendarId === "string") {
      calendarId = parseInt(calendarId);
    }

    let res = await axios.get<IEvent[]>(`/Event`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
      params: {
        calendarId: calendarId,
      },
    });
  }

  // Method to get events by date and calendarId
  // Takes date and calendarId as parameters and returns an array of events
  getEventsByDate(date: Date, calendarId: number): IEvent[] {
    // Convert to number if calendarId is a string
    if (typeof calendarId === "string") {
      calendarId = parseInt(calendarId);
    }

    let ongoingEvents: IEvent[] = events.filter(
      (event) =>
        event.CalendarId === calendarId &&
        event.EventStart.toDateString() === date.toDateString(),
    );
    ongoingEvents.push(
      ...events.filter(
        (event) =>
          event.CalendarId === calendarId &&
          event.EventEnd.toDateString() === date.toDateString(),
      ),
    );
    ongoingEvents.push(
      ...events.filter(
        (event) =>
          event.CalendarId === calendarId &&
          event.EventStart < date &&
          event.EventEnd > date,
      ),
    );

    // Remove duplicates
    ongoingEvents = ongoingEvents.filter(
      (event, index, self) =>
        index === self.findIndex((e) => e.EventId === event.EventId),
    );

    return ongoingEvents;
  }

  // Method to update an event
  // Takes an event object as a parameter and updates the event in the events array
  updateEvent(event: IEvent): void {
    // TODO - Implement update logic
    // Waiting for backend to be implemented
  }
}

const events: IEvent[] = [
  {
    EventId: 1,
    CalendarId: 1,
    EventTitle: "Consume Alcohol",
    EventDescription: "Discuss project updates",
    EventStart: new Date("2025-05-12T10:00:00"),
    EventEnd: new Date("2025-05-30T11:00:00"),
  },
  {
    EventId: 2,
    CalendarId: 1,
    EventTitle: "Meeting",
    EventDescription: "Discuss project updates",
    EventStart: new Date("2025-06-09T10:00:00"),
    EventEnd: new Date("2025-06-09T11:00:00"),
  },
  {
    EventId: 3,
    CalendarId: 1,
    EventTitle: "Birthday Party",
    EventDescription: "Celebrate John's birthday",
    EventStart: new Date("2025-05-18T10:00:00"),
    EventEnd: new Date("2025-05-18T11:00:00"),
  },
];
