import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewdataPage } from './viewdata.page';

describe('ViewdataPage', () => {
  let component: ViewdataPage;
  let fixture: ComponentFixture<ViewdataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewdataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
