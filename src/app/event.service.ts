import { Injectable } from "@angular/core";
import IEvent from "@/Interfaces/IEvent";
import { EventEmitter } from "stream";
import { UserService } from "./user.service";
import axios from "axios";
import { CreateEventRequest } from "./create-event-modal/create-event-modal.component";

@Injectable({
  providedIn: "root",
})
export class EventService {
  constructor(private userService: UserService) {}

  async createEvent(eventRequest: CreateEventRequest)

  // TODO - do smth here


  // Method to update an event
  // Takes an event object as a parameter and updates the event in the events array
  updateEvent(event: IEvent): void {
    // TODO - Implement update logic
    // Waiting for backend to be implemented
  }
}
