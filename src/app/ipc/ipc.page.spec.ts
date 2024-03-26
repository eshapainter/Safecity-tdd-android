import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IpcPage } from './ipc.page';

describe('IpcPage', () => {
  let component: IpcPage;
  let fixture: ComponentFixture<IpcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IpcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
