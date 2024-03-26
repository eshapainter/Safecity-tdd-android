import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModelreportPage } from './modelreport.page';

describe('ModelreportPage', () => {
  let component: ModelreportPage;
  let fixture: ComponentFixture<ModelreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
