import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutsafecityPage } from './aboutsafecity.page';

describe('AboutsafecityPage', () => {
  let component: AboutsafecityPage;
  let fixture: ComponentFixture<AboutsafecityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutsafecityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutsafecityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
