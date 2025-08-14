// create-event-modal.component.ts
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CreateEventRequest {
  eventTitle: string;
  eventDescription: string;
  eventStart: string;
  eventEnd: string;
  calendarId: number;
}

@Component({
  selector: 'app-create-event-modal',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Create New Event</h2>
          <button class="close-btn" (click)="closeModal()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <form class="event-form" (ngSubmit)="onSubmit()" #eventForm="ngForm">
          <div class="form-group">
            <label for="eventTitle">Event Title *</label>
            <input 
              type="text" 
              id="eventTitle"
              name="eventTitle"
              [(ngModel)]="eventData.eventTitle"
              required
              maxlength="100"
              class="form-input"
              placeholder="Enter event title">
            <div class="error-message" *ngIf="showErrors && !eventData.eventTitle">
              Event title is required
            </div>
          </div>

          <div class="form-group">
            <label for="eventDescription">Description</label>
            <textarea 
              id="eventDescription"
              name="eventDescription"
              [(ngModel)]="eventData.eventDescription"
              class="form-textarea"
              rows="3"
              maxlength="500"
              placeholder="Enter event description (optional)"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="eventStart">Start Date & Time *</label>
              <input 
                type="datetime-local" 
                id="eventStart"
                name="eventStart"
                [(ngModel)]="eventData.eventStart"
                required
                class="form-input"
                [min]="minDate">
              <div class="error-message" *ngIf="showErrors && !eventData.eventStart">
                Start date is required
              </div>
            </div>

            <div class="form-group">
              <label for="eventEnd">End Date & Time *</label>
              <input 
                type="datetime-local" 
                id="eventEnd"
                name="eventEnd"
                [(ngModel)]="eventData.eventEnd"
                required
                class="form-input"
                [min]="eventData.eventStart || minDate">
              <div class="error-message" *ngIf="showErrors && !eventData.eventEnd">
                End date is required
              </div>
              <div class="error-message" *ngIf="showErrors && eventData.eventStart && eventData.eventEnd && eventData.eventEnd <= eventData.eventStart">
                End date must be after start date
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="closeModal()">
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn-primary" 
              [disabled]="isSubmitting() || !eventForm.valid">
              <span *ngIf="!isSubmitting()">Create Event</span>
              <span *ngIf="isSubmitting()">Creating...</span>
            </button>
          </div>
        </form>

        <div class="error-message" *ngIf="errorMessage()">
          {{ errorMessage() }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }

    .modal-content {
      background: #2a2a2a;
      border-radius: 12px;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #444;
    }

    .modal-header h2 {
      margin: 0;
      color: #f9f9f9;
      font-size: 1.5rem;
    }

    .close-btn {
      background: none;
      border: none;
      color: #f9f9f9;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .close-btn:hover {
      background-color: #444;
    }

    .event-form {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #f9f9f9;
      font-weight: 500;
    }

    .form-input, .form-textarea {
      width: 100%;
      padding: 0.75rem;
      background-color: #3a3a3a;
      border: 1px solid #555;
      border-radius: 6px;
      color: #f9f9f9;
      font-size: 1rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .form-input:focus, .form-textarea:focus {
      outline: none;
      border-color: #1976d2;
    }

    .form-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #444;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      min-width: 120px;
    }

    .btn-primary {
      background-color: #1976d2;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #125ea2;
    }

    .btn-primary:disabled {
      background-color: #555;
      cursor: not-allowed;
      opacity: 0.6;
    }

    .btn-secondary {
      background-color: #444;
      color: #f9f9f9;
    }

    .btn-secondary:hover {
      background-color: #555;
    }

    .error-message {
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
  `]
})
export class CreateEventModalComponent {
  @Input() calendarId: number = 0;
  @Input() selectedDate?: Date;
  @Output() eventCreated = new EventEmitter<CreateEventRequest>();
  @Output() modalClosed = new EventEmitter<void>();

  showErrors = false;
  isSubmitting: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');

  eventData: CreateEventRequest = {
    eventTitle: '',
    eventDescription: '',
    eventStart: '',
    eventEnd: '',
    calendarId: this.calendarId
  };

  minDate: string = new Date().toISOString().slice(0, 16);

  ngOnInit() {
    this.eventData.calendarId = this.calendarId;
    
    // If a date is pre-selected, set default start/end times
    if (this.selectedDate) {
      const startDate = new Date(this.selectedDate);
      startDate.setHours(12, 0); // Default to noon
      
      const endDate = new Date(startDate);
      endDate.setHours(13, 0); // Default 1-hour duration
      
      this.eventData.eventStart = startDate.toISOString().slice(0, 16);
      this.eventData.eventEnd = endDate.toISOString().slice(0, 16);
    }
  }

  closeModal() {
    this.modalClosed.emit();
  }

  onSubmit() {
    this.showErrors = true;
    this.errorMessage.set('');

    // Validate form
    if (!this.eventData.eventTitle.trim()) {
      this.errorMessage.set('Event title is required');
      return;
    }

    if (!this.eventData.eventStart || !this.eventData.eventEnd) {
      this.errorMessage.set('Start and end dates are required');
      return;
    }

    if (new Date(this.eventData.eventEnd) <= new Date(this.eventData.eventStart)) {
      this.errorMessage.set('End date must be after start date');
      return;
    }

    this.isSubmitting.set(true);

    // Emit the event data
    const eventRequest: CreateEventRequest = {
      ...this.eventData,
      eventTitle: this.eventData.eventTitle.trim(),
      eventDescription: this.eventData.eventDescription.trim() || '',
      calendarId: this.calendarId
    };

    this.eventCreated.emit(eventRequest);
  }

  setSubmittingComplete() {
    this.isSubmitting.set(false);
  }

  setError(message: string) {
    this.errorMessage.set(message);
    this.isSubmitting.set(false);
  }
}