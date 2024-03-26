import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms'
import { LanguageselectionPage } from './languageselection.page';

describe('LanguageselectionPage', () => {
  let component: LanguageselectionPage;
  let fixture: ComponentFixture<LanguageselectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageselectionPage ],
      imports: [IonicModule.forRoot(),FormsModule,ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageselectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
