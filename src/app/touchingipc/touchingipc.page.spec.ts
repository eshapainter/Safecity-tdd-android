import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TouchingipcPage } from './touchingipc.page';

describe('TouchingipcPage', () => {
  let component: TouchingipcPage;
  let fixture: ComponentFixture<TouchingipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouchingipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TouchingipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
