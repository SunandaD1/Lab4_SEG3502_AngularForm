import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { UserForm } from './user-form';
import { UserDataService } from '../user-data';

describe('UserForm', () => {
  let component: UserForm;
  let fixture: ComponentFixture<UserForm>;
  let router: Router;
  let userDataService: UserDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserForm],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userDataService = TestBed.inject(UserDataService);
    await fixture.whenStable();
  });

  function fillValid(): void {
    component.userForm.setValue({
      firstName: 'Mariella',
      lastName: 'Azar',
      phone: '6135551234',
      email: 'mariella@example.com'
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when first name and last name are empty', () => {
    expect(component.userForm.invalid).toBe(true);
    expect(component.firstName.errors?.['required']).toBeTruthy();
    expect(component.lastName.errors?.['required']).toBeTruthy();
  });

  it('should be valid when phone and email are empty (optional fields)', () => {
    component.userForm.setValue({
      firstName: 'Mariella',
      lastName: 'Azar',
      phone: '',
      email: ''
    });
    expect(component.userForm.valid).toBe(true);
  });

  it('should accept a valid 10 digit phone number', () => {
    component.phone.setValue('6135551234');
    expect(component.phone.valid).toBe(true);
  });

  it('should reject a phone number whose first digit is 0', () => {
    component.phone.setValue('0135551234');
    expect(component.phone.errors?.['pattern']).toBeTruthy();
  });

  it('should reject a phone number whose fourth digit is 0', () => {
    component.phone.setValue('6130551234');
    expect(component.phone.errors?.['pattern']).toBeTruthy();
  });

  it('should reject a phone number with fewer than 10 digits', () => {
    component.phone.setValue('613555123');
    expect(component.phone.errors?.['pattern']).toBeTruthy();
  });

  it('should reject a phone number with more than 10 digits', () => {
    component.phone.setValue('61355512345');
    expect(component.phone.errors?.['pattern']).toBeTruthy();
  });

  it('should reject a phone number containing letters', () => {
    component.phone.setValue('613555abcd');
    expect(component.phone.errors?.['pattern']).toBeTruthy();
  });

  it('should reject an invalid email', () => {
    component.email.setValue('not-an-email');
    expect(component.email.errors?.['email']).toBeTruthy();
  });

  it('should accept a valid email', () => {
    component.email.setValue('abc@test.com');
    expect(component.email.valid).toBe(true);
  });

  it('should show error messages after submitting an empty form', async () => {
    const button = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('First name is required.');
    expect(text).toContain('Last name is required.');
  });

  it('should not store data or navigate when the form is invalid', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const setUserSpy = vi.spyOn(userDataService, 'setUser');

    component.onSubmit();

    expect(setUserSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should store the data and navigate to /details when valid', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fillValid();

    component.onSubmit();

    expect(userDataService.getUser()).toEqual({
      firstName: 'Mariella',
      lastName: 'Azar',
      phone: '6135551234',
      email: 'mariella@example.com'
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/details']);
  });
});