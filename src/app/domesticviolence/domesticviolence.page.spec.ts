import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomesticviolencePage } from './domesticviolence.page';

describe('DomesticviolencePage', () => {
  let component: DomesticviolencePage;
  let fixture: ComponentFixture<DomesticviolencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticviolencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomesticviolencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
