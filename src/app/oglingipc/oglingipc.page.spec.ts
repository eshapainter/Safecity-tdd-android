import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OglingipcPage } from './oglingipc.page';

describe('OglingipcPage', () => {
  let component: OglingipcPage;
  let fixture: ComponentFixture<OglingipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OglingipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OglingipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
