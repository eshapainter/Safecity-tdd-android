import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocialpopPage } from './socialpop.page';

describe('SocialpopPage', () => {
  let component: SocialpopPage;
  let fixture: ComponentFixture<SocialpopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialpopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialpopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
