import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnboardingthreePage } from './onboardingthree.page';

describe('OnboardingthreePage', () => {
  let component: OnboardingthreePage;
  let fixture: ComponentFixture<OnboardingthreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingthreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingthreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
