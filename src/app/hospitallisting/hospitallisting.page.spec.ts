import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HospitallistingPage } from './hospitallisting.page';

describe('HospitallistingPage', () => {
  let component: HospitallistingPage;
  let fixture: ComponentFixture<HospitallistingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitallistingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HospitallistingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
