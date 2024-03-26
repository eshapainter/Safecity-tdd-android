import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindhospitalPage } from './findhospital.page';

describe('FindhospitalPage', () => {
  let component: FindhospitalPage;
  let fixture: ComponentFixture<FindhospitalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindhospitalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindhospitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
