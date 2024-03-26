import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SexualassaultipcPage } from './sexualassaultipc.page';

describe('SexualassaultipcPage', () => {
  let component: SexualassaultipcPage;
  let fixture: ComponentFixture<SexualassaultipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexualassaultipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SexualassaultipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
