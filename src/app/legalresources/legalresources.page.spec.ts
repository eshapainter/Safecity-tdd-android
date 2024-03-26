import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegalresourcesPage } from './legalresources.page';

describe('LegalresourcesPage', () => {
  let component: LegalresourcesPage;
  let fixture: ComponentFixture<LegalresourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalresourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalresourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
