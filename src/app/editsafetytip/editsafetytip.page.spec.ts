import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditsafetytipPage } from './editsafetytip.page';

describe('EditsafetytipPage', () => {
  let component: EditsafetytipPage;
  let fixture: ComponentFixture<EditsafetytipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsafetytipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditsafetytipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
