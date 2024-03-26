import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportfiledsevenPage } from './reportfiledseven.page';

describe('ReportfiledsevenPage', () => {
  let component: ReportfiledsevenPage;
  let fixture: ComponentFixture<ReportfiledsevenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfiledsevenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportfiledsevenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
