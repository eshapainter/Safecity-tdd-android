import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SexualinvitesipcPage } from './sexualinvitesipc.page';

describe('SexualinvitesipcPage', () => {
  let component: SexualinvitesipcPage;
  let fixture: ComponentFixture<SexualinvitesipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexualinvitesipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SexualinvitesipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
