import IEvent from '@/Interfaces/IEvent';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-more-events-modal',
  imports: [CommonModule],
  templateUrl: './more-events-modal.component.html',
  styleUrl: './more-events-modal.component.css'
})
export class MoreEventsModalComponent {
  @Input() events!: IEvent[]; // Array of events to display in the modal
  @Input() close!: any; // EventEmitter to close the modal
  @Input() openEvent: any; // EventEmitter to open the event modal

  ngOnInit() {

  }
}
