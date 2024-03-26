import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportfiledtwoPage } from './reportfiledtwo.page';

describe('ReportfiledtwoPage', () => {
  let component: ReportfiledtwoPage;
  let fixture: ComponentFixture<ReportfiledtwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfiledtwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportfiledtwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
