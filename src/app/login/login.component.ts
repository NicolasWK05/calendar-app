import { UserService } from '@/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService] // Provide the UserService here
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) {
    // Constructor logic here
  }
  // userService: UserService = new UserService();

  onSubmit() {
    console.log(this.username, this.password);
    this.userService.setUser({Username: this.username, PasswordHash: this.password, UserId: 1, ProflePicture: ''});

    this.router.navigate(['/calendar']);
    
  }

  username = '';
  password = '';

}
