import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SevensubfieldonePage } from './sevensubfieldone.page';

describe('SevensubfieldonePage', () => {
  let component: SevensubfieldonePage;
  let fixture: ComponentFixture<SevensubfieldonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevensubfieldonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SevensubfieldonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
