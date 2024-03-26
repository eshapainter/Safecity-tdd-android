import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafteytipThankyouPage } from './safteytip-thankyou.page';

describe('SafteytipThankyouPage', () => {
  let component: SafteytipThankyouPage;
  let fixture: ComponentFixture<SafteytipThankyouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafteytipThankyouPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafteytipThankyouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
