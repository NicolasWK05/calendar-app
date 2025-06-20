// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '@/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    console.log(this.username, this.password);

    this.userService.login({ Username: this.username, Password: this.password }).then(success => {
      if (success) {
        console.log('Login successful');
        this.router.navigate(['/']);
      } else {
        console.error('Login failed');
        alert('Login failed. Please check your credentials.');
      }
    }).catch(error => {
      console.error('Error during login:', error); 
      alert('An error occurred during login. Please try again later.');
    }
    );

    this.router.navigate(['/']);
  }
}
