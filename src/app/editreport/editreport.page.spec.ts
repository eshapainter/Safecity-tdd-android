import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditreportPage } from './editreport.page';

describe('EditreportPage', () => {
  let component: EditreportPage;
  let fixture: ComponentFixture<EditreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
