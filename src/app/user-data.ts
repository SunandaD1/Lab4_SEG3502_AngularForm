import { Injectable } from '@angular/core';

export interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private user: UserData | null = null;

  setUser(user: UserData): void {
    this.user = user;
  }

  getUser(): UserData | null {
    return this.user;
  }
}