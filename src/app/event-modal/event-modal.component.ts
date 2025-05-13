import { Component, Input, Output } from '@angular/core';
import IEvent from '@/Interfaces/IEvent';
// import EventEmitter from 'events';

@Component({
  selector: 'app-event-modal',
  imports: [],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent {
  @Input() event!: IEvent | null; // Event object passed from the parent component
  // @Input() isOpen: boolean = false; // Flag to control modal visibility
  @Input() close!: any; // EventEmitter to close the modal

  ngOnInit() {
    // Closem modal if event is null
    if (!this.event) {
      console.log("Event is null, closing modal");
      this.close.emit("closeModal");
    }
  }
}