import { Component, Input, Output, signal, WritableSignal } from '@angular/core';
import IEvent from '@/Interfaces/IEvent';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import EventEmitter from 'events';

@Component({
  selector: 'app-event-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent {
  @Input() event!: IEvent | null; // Event object passed from the parent component
  // @Input() isOpen: boolean = false; // Flag to control modal visibility
  @Input() close!: any; // EventEmitter to close the modal

  EditMode: WritableSignal<boolean> = signal(false); // Signal to track edit mode
  EditEvent: WritableSignal<IEvent | null> = signal(null); // Signal to hold the event being edited

  ngOnInit() {
    // Closem modal if event is null
    if (!this.event) {
      console.log("Event is null, closing modal");
      this.close.emit("closeModal");
    }
  }
}