import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor() {
    // Constructor logic here
  }

  onSubmit() {
    console.log('Form submitted:', this.username, this.password);
  }

  username = '';
  password = '';

  

}
