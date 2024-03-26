import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilingFIRPage } from './filing-fir.page';

describe('FilingFIRPage', () => {
  let component: FilingFIRPage;
  let fixture: ComponentFixture<FilingFIRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingFIRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilingFIRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
