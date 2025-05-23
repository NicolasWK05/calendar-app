import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIcon, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen()); // Toggle the dropdown state
  }

  isLoggedIn: boolean = false; // Flag to check if user is logged in
  // TODO - Implement authentication service to check if user is logged in

  dropdownOpen: WritableSignal<boolean> = signal(false); // Signal to manage dropdown state
}
