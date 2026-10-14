import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {

  private builder = inject(FormBuilder);
  private router = inject(Router);
  private userDataService = inject(UserDataService);

  userForm = this.builder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.pattern('[1-9][0-9]{2}[1-9][0-9]{6}')],
    email: ['', Validators.email]
  });

  get firstName() {
    return this.userForm.controls.firstName;
  }

  get lastName() {
    return this.userForm.controls.lastName;
  }

  get phone() {
    return this.userForm.controls.phone;
  }

  get email() {
    return this.userForm.controls.email;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.userDataService.setUser(
      this.userForm.getRawValue()
    );

    this.router.navigate(['/details']);
  }
}