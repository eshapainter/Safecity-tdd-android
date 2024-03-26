import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SevensubfieldtwoPage } from './sevensubfieldtwo.page';

describe('SevensubfieldtwoPage', () => {
  let component: SevensubfieldtwoPage;
  let fixture: ComponentFixture<SevensubfieldtwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevensubfieldtwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SevensubfieldtwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
