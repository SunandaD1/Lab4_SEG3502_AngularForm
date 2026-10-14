import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserDataService } from '../user-data';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css'
})
export class UserDetails {
  private userDataService = inject(UserDataService);

  user = this.userDataService.getUser();
}