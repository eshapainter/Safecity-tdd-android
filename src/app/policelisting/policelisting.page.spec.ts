import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicelistingPage } from './policelisting.page';

describe('PolicelistingPage', () => {
  let component: PolicelistingPage;
  let fixture: ComponentFixture<PolicelistingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicelistingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicelistingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
