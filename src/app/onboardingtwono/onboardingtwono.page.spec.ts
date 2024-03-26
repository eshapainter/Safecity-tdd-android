import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnboardingtwonoPage } from './onboardingtwono.page';

describe('OnboardingtwonoPage', () => {
  let component: OnboardingtwonoPage;
  let fixture: ComponentFixture<OnboardingtwonoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingtwonoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingtwonoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
