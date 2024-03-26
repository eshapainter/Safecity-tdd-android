import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StakingipcPage } from './stakingipc.page';

describe('StakingipcPage', () => {
  let component: StakingipcPage;
  let fixture: ComponentFixture<StakingipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakingipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StakingipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
