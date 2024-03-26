import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafteytiponePage } from './safteytipone.page';

describe('SafteytiponePage', () => {
  let component: SafteytiponePage;
  let fixture: ComponentFixture<SafteytiponePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafteytiponePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafteytiponePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
