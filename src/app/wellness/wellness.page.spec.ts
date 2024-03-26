import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WellnessPage } from './wellness.page';

describe('WellnessPage', () => {
  let component: WellnessPage;
  let fixture: ComponentFixture<WellnessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellnessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WellnessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
