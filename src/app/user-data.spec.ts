import { TestBed } from '@angular/core/testing';
import { UserDataService } from './user-data';

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when no user has been stored', () => {
    expect(service.getUser()).toBeNull();
  });

  it('should store and return the user data', () => {
    const user = {
      firstName: 'Mariella',
      lastName: 'Azar',
      phone: '6135551234',
      email: 'mariella@example.com'
    };

    service.setUser(user);

    expect(service.getUser()).toEqual(user);
  });
});