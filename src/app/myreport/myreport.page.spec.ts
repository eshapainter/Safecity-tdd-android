import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyreportPage } from './myreport.page';

describe('MyreportPage', () => {
  let component: MyreportPage;
  let fixture: ComponentFixture<MyreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
