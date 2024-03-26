import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnboardingonePage } from './onboardingone.page';

describe('OnboardingonePage', () => {
  let component: OnboardingonePage;
  let fixture: ComponentFixture<OnboardingonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
