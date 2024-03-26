import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportfiledfivePage } from './reportfiledfive.page';

describe('ReportfiledfivePage', () => {
  let component: ReportfiledfivePage;
  let fixture: ComponentFixture<ReportfiledfivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfiledfivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportfiledfivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
