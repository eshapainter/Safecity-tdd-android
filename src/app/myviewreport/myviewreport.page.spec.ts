import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyviewreportPage } from './myviewreport.page';

describe('MyviewreportPage', () => {
  let component: MyviewreportPage;
  let fixture: ComponentFixture<MyviewreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyviewreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyviewreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
