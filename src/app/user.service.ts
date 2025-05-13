import { Injectable } from '@angular/core';
import IUser from '@/Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(userId: number): IUser | undefined {
    return users.find(user => user.UserId === userId);
  }
}


const users: IUser[] = [
  {
    UserId: 1,
    Username: 'JohnDoe',
    PasswordHash: 'hashedpassword123',
    ProflePicture: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fa.storyblok.com%2Ff%2F191576%2F1200x800%2Fa3640fdc4c%2Fprofile_picture_maker_before.webp&f=1&nofb=1&ipt=fd30af1eaa811e715227c18b04bd137fe7df9fefa40d896b34b5920956e08e46'
  }
]