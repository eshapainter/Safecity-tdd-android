import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreframingPage } from './preframing.page';

describe('PreframingPage', () => {
  let component: PreframingPage;
  let fixture: ComponentFixture<PreframingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreframingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreframingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
