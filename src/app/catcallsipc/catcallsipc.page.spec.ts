import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatcallsipcPage } from './catcallsipc.page';

describe('CatcallsipcPage', () => {
  let component: CatcallsipcPage;
  let fixture: ComponentFixture<CatcallsipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatcallsipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatcallsipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
