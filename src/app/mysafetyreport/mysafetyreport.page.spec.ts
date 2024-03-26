import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MysafetyreportPage } from './mysafetyreport.page';

describe('MysafetyreportPage', () => {
  let component: MysafetyreportPage;
  let fixture: ComponentFixture<MysafetyreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysafetyreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MysafetyreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
