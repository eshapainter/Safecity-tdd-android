import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindpolicePage } from './findpolice.page';

describe('FindpolicePage', () => {
  let component: FindpolicePage;
  let fixture: ComponentFixture<FindpolicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindpolicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindpolicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
