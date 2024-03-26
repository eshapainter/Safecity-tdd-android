import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerficationPage } from './verfication.page';

describe('VerficationPage', () => {
  let component: VerficationPage;
  let fixture: ComponentFixture<VerficationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerficationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerficationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
