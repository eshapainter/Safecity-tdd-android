import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnlineipcPage } from './onlineipc.page';

describe('OnlineipcPage', () => {
  let component: OnlineipcPage;
  let fixture: ComponentFixture<OnlineipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
