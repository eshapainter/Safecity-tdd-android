import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SevensubfieldthreePage } from './sevensubfieldthree.page';

describe('SevensubfieldthreePage', () => {
  let component: SevensubfieldthreePage;
  let fixture: ComponentFixture<SevensubfieldthreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevensubfieldthreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SevensubfieldthreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
