import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import IUser from '@/Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  // It will be accessed using methods in this service, and will be used to store the user information
  // NOTE - This is how we store the information after fetching it from the server
  private user: WritableSignal<IUser | undefined> = signal<IUser | undefined>(undefined);
  
  isLoggedIn(): boolean {
    return this.user() !== undefined;
  }

  // TODO - Remove this, this is just for testing
  getUser(): IUser | undefined {
    return this.user();
  }

  setUser(user: IUser) {
    this.user.set(user);
  } // TODO - Remove this, this is just for testing
}


const users: IUser[] = [
  {
    UserId: 1,
    Username: 'JohnDoe',
    PasswordHash: 'hashedpassword123',
    ProflePicture: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fa.storyblok.com%2Ff%2F191576%2F1200x800%2Fa3640fdc4c%2Fprofile_picture_maker_before.webp&f=1&nofb=1&ipt=fd30af1eaa811e715227c18b04bd137fe7df9fefa40d896b34b5920956e08e46'
  }
]