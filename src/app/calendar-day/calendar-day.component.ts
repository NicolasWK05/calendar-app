import { Component, Inject, Input, signal, WritableSignal } from '@angular/core';
import IEvent from '@/Interfaces/IEvent';
import { EventService } from '@/event.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { EventModalComponent } from '@/event-modal/event-modal.component';
import EventEmitter from 'events';
import e from 'express';
import { MoreEventsModalComponent } from "../more-events-modal/more-events-modal.component";

@Component({
  selector: 'app-calendar-day',
  imports: [CommonModule, EventModalComponent, MoreEventsModalComponent],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.css'
})
export class CalendarDayComponent {

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Constructor logic here
  }

  @Input() date!: Date;
  @Input() calendarId!: number; // Calendar ID to identify which calendar to fetch events from

  events: IEvent[] = []; // Array to hold events for the selected date
  eventService: EventService = new EventService();

  today = new Date(); // Get today's date

  ngOnInit() {
    this.events = this.eventService.getEventsByDate(this.date,this.calendarId);
  }


  ngAfterViewInit() {

  }

  


  isModalOpen: WritableSignal<boolean> = signal(false); // Flag to control modal visibility
  selectedEvent: WritableSignal<IEvent | null> = signal(null); // Store the selected event for the modal

  moreEventsModalOpen: WritableSignal<boolean> = signal(false); // Flag to control modal visibility

  onEventSelected(event: IEvent) {
    // console.log('Selected Event:', event);
    this.selectedEvent.set(event); // Set the selected event for the modal
    this.isModalOpen.set(true) // Open the modal when an event is selected
  }
  // Create EventEmitter that modal can emit to and parent can listen to
  closeEventModalEmitter = new EventEmitter().on('closeModal', () => {
    this.selectedEvent.set(null); // Set the selected event for the modal
    this.isModalOpen.set(false) // Open the modal when an event is selectedconsole.log('Modal closed');
  });

  closeMoreEventsModalEmitter = new EventEmitter().on('closeModal', () => {
    this.moreEventsModalOpen.set(false); // Close the modal when an event is selected
    // console.log('Modal closed');
  });

  openEventEmitter = new EventEmitter().on('openEvent', (event: IEvent) => {
    this.moreEventsModalOpen.set(false); // Close the modal when an event is selected
    this.selectedEvent.set(event); // Set the selected event for the modal
    this.isModalOpen.set(true); // Open the modal when an event is selected
  });

  showMoreEvents() {
    this.moreEventsModalOpen.set(true); // Open the modal when an event is selected
    console.log('More Events Modal Opened', this.moreEventsModalOpen());
  }


}
