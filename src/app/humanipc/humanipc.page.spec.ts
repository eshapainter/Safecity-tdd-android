import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HumanipcPage } from './humanipc.page';

describe('HumanipcPage', () => {
  let component: HumanipcPage;
  let fixture: ComponentFixture<HumanipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HumanipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
