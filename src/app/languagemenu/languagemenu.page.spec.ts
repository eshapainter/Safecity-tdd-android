import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LanguagemenuPage } from './languagemenu.page';

describe('LanguagemenuPage', () => {
  let component: LanguagemenuPage;
  let fixture: ComponentFixture<LanguagemenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagemenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagemenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
