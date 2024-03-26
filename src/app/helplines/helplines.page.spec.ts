import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelplinesPage } from './helplines.page';

describe('HelplinesPage', () => {
  let component: HelplinesPage;
  let fixture: ComponentFixture<HelplinesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelplinesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelplinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
