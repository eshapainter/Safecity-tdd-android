import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountrymenuPage } from './countrymenu.page';

describe('CountrymenuPage', () => {
  let component: CountrymenuPage;
  let fixture: ComponentFixture<CountrymenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrymenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountrymenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
