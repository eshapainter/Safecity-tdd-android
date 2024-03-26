import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrimaryformPage } from './primaryform.page';

describe('PrimaryformPage', () => {
  let component: PrimaryformPage;
  let fixture: ComponentFixture<PrimaryformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
