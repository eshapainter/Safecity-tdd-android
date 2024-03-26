import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreframingsecondaryPage } from './preframingsecondary.page';

describe('PreframingsecondaryPage', () => {
  let component: PreframingsecondaryPage;
  let fixture: ComponentFixture<PreframingsecondaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreframingsecondaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreframingsecondaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
