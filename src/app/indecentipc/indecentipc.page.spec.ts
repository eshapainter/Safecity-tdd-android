import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndecentipcPage } from './indecentipc.page';

describe('IndecentipcPage', () => {
  let component: IndecentipcPage;
  let fixture: ComponentFixture<IndecentipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndecentipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndecentipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
