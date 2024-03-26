import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChainsnachtingipcPage } from './chainsnachtingipc.page';

describe('ChainsnachtingipcPage', () => {
  let component: ChainsnachtingipcPage;
  let fixture: ComponentFixture<ChainsnachtingipcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainsnachtingipcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChainsnachtingipcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
