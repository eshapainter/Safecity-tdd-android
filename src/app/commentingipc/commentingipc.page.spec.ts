import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentingipcPage } from './commentingipc.page';

describe('CommentingipcPage', () => {
  let component: CommentingipcPage;
  let fixture: ComponentFixture<CommentingipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentingipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentingipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
