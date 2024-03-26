import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncidentfilterPage } from './incidentfilter.page';

describe('IncidentfilterPage', () => {
  let component: IncidentfilterPage;
  let fixture: ComponentFixture<IncidentfilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentfilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentfilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
