import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafteytipthreePage } from './safteytipthree.page';

describe('SafteytipthreePage', () => {
  let component: SafteytipthreePage;
  let fixture: ComponentFixture<SafteytipthreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafteytipthreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafteytipthreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
