import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafteytipfourPage } from './safteytipfour.page';

describe('SafteytipfourPage', () => {
  let component: SafteytipfourPage;
  let fixture: ComponentFixture<SafteytipfourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafteytipfourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafteytipfourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
