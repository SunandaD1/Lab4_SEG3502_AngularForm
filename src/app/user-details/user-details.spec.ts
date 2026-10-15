import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserDetails } from './user-details';
import { UserData, UserDataService } from '../user-data';

describe('UserDetails', () => {
  // Configures the test module, optionally stores a user in the service,
  // then creates the component (the component reads the service on creation).
  async function createComponent(user?: UserData) {
    await TestBed.configureTestingModule({
      imports: [UserDetails],
      providers: [provideRouter([])]
    }).compileComponents();

    if (user) {
      TestBed.inject(UserDataService).setUser(user);
    }

    const fixture = TestBed.createComponent(UserDetails);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  it('should create', async () => {
    const fixture = await createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show a message when no user has been submitted', async () => {
    const fixture = await createComponent();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('table')).toBeNull();
    expect(el.textContent).toContain('No user information has been submitted.');
  });

  it('should display the submitted user data in a table', async () => {
    const fixture = await createComponent({
      firstName: 'Mariella',
      lastName: 'Azar',
      phone: '6135551234',
      email: 'mariella@example.com'
    });
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('table')).toBeTruthy();
    expect(el.textContent).toContain('Mariella');
    expect(el.textContent).toContain('Azar');
    expect(el.textContent).toContain('6135551234');
    expect(el.textContent).toContain('mariella@example.com');
  });

  it('should show "Not provided" for empty optional fields', async () => {
    const fixture = await createComponent({
      firstName: 'Mariella',
      lastName: 'Azar',
      phone: '',
      email: ''
    });
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text.match(/Not provided/g)?.length).toBe(2);
  });

  it('should have a Back to Form link pointing to /form', async () => {
    const fixture = await createComponent();
    const link = (fixture.nativeElement as HTMLElement).querySelector('a');

    expect(link?.textContent).toContain('Back to Form');
    expect(link?.getAttribute('href')).toBe('/form');
  });
});