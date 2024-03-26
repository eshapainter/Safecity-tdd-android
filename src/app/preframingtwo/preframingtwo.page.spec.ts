import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreframingtwoPage } from './preframingtwo.page';

describe('PreframingtwoPage', () => {
  let component: PreframingtwoPage;
  let fixture: ComponentFixture<PreframingtwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreframingtwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreframingtwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
