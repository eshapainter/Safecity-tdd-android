import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailpopupPage } from './detailpopup.page';

describe('DetailpopupPage', () => {
  let component: DetailpopupPage;
  let fixture: ComponentFixture<DetailpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
