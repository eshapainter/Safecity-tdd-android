import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NgopartnerPage } from './ngopartner.page';

describe('NgopartnerPage', () => {
  let component: NgopartnerPage;
  let fixture: ComponentFixture<NgopartnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgopartnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NgopartnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
