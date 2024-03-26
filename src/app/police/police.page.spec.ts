import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicePage } from './police.page';

describe('PolicePage', () => {
  let component: PolicePage;
  let fixture: ComponentFixture<PolicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
