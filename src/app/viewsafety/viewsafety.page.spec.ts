import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewsafetyPage } from './viewsafety.page';

describe('ViewsafetyPage', () => {
  let component: ViewsafetyPage;
  let fixture: ComponentFixture<ViewsafetyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsafetyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewsafetyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
