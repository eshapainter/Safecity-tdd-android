import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafteytiptwoPage } from './safteytiptwo.page';

describe('SafteytiptwoPage', () => {
  let component: SafteytiptwoPage;
  let fixture: ComponentFixture<SafteytiptwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafteytiptwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafteytiptwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
