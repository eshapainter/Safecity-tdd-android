import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountrymenupopoverPage } from './countrymenupopover.page';

describe('CountrymenupopoverPage', () => {
  let component: CountrymenupopoverPage;
  let fixture: ComponentFixture<CountrymenupopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrymenupopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountrymenupopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
