import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  toggleDropdown() {
    console.log('Dropdown toggled');
  }

  isLoggedIn: boolean = false; // Flag to check if user is logged in
  // TODO - Implement authentication service to check if user is logged in

  
}
