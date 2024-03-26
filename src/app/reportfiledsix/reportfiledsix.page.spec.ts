import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportfiledsixPage } from './reportfiledsix.page';

describe('ReportfiledsixPage', () => {
  let component: ReportfiledsixPage;
  let fixture: ComponentFixture<ReportfiledsixPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfiledsixPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportfiledsixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
