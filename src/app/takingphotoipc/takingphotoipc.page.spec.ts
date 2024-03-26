import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakingphotoipcPage } from './takingphotoipc.page';

describe('TakingphotoipcPage', () => {
  let component: TakingphotoipcPage;
  let fixture: ComponentFixture<TakingphotoipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakingphotoipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakingphotoipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
