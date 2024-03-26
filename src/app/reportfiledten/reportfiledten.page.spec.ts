import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportfiledtenPage } from './reportfiledten.page';

describe('ReportfiledtenPage', () => {
  let component: ReportfiledtenPage;
  let fixture: ComponentFixture<ReportfiledtenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfiledtenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportfiledtenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
