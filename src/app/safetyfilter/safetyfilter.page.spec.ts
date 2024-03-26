import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafetyfilterPage } from './safetyfilter.page';

describe('SafetyfilterPage', () => {
  let component: SafetyfilterPage;
  let fixture: ComponentFixture<SafetyfilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafetyfilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafetyfilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
