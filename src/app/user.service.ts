import { Injectable, signal } from '@angular/core';
import IUser from './Interfaces/IUser';
import axios from 'axios';
import ILogin from './Interfaces/ILogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  async login(user: ILogin) {
    const res = await axios.post('/Auth/login', {username: user.Username, passwordHash: user.Password});
    if (res.status === 200) {
      const token = res.data; // Token should be raw string
      localStorage.setItem('token', token); // Store token in localStorage
      return true; // Login successful
    }

    console.error('Login failed:', res.status, res.statusText);
    return false; // Login failed
  }

  async User(): Promise<IUser | null> {
    if (typeof window === 'undefined') return null; // Check if running in SSR context
    const token = localStorage.getItem('token'); // NOTE - localStorage is not available in SSR context, so this will only work in client-side rendering
    if (!token) return null; // No token found, user not logged in

    try {
      const res = await axios.get<{username: string, userId: number}>('/Auth', {
        headers: {
          'Authorization': `Bearer ${token}` // Send token in Authorization header
        }
      });
      let user: IUser = {
        UserId: res.data.userId,
        Username: res.data.username
      }
      return user; // Return user data
    } catch (error) {
      console.error('Error fetching user:', error);
      return null; // Return null if there's an error
    }
  }

}
