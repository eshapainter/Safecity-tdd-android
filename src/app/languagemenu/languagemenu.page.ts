import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from '../shared.service'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-languagemenu',
  templateUrl: './languagemenu.page.html',
  styleUrls: ['./languagemenu.page.scss'],
})
export class LanguagemenuPage implements OnInit {
  language_list
  public form: FormGroup;
  val
  constructor(public translate:TranslateService, public formBuilder: FormBuilder,private sharedservice : SharedService) { 
    
    //  this.form = formBuilder.group({
    //   lang: [this.val ]      
    // });
    this.getLanguageList()
    
  }

  ngOnInit() {
    setTimeout(()=>{
      this.val = localStorage.getItem('Lang_id')  
      console.log(this.val)
    },700);
  
  }

  getLanguageList()
  {
    let data = new FormData();
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    data.append('security_key','07b337e9971f28d49c9c4b0449ea071131f4a3b6');
    this.sharedservice.sharedPostRequest('common_controller/languagesList',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.language_list = rdata['data']
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });
  }

  selectLanguage(e)
  {
    console.log( e.detail.value)
   
  }

  changeLanguage(e)
  {
    console.log(e)
    if(e.detail.value == '1')
      {
        this.translate.setDefaultLang('en')
        this.translate.use('en')
        localStorage.setItem('language', 'en')  
        localStorage.setItem('Lang_id', e.detail.value)  
      }
     else if(e.detail.value == '42')
      {
        this.translate.setDefaultLang('hi')
        this.translate.use('hi')
        localStorage.setItem('language', 'hi')  
        localStorage.setItem('Lang_id', e.detail.value)  
      }
      else if(e.detail.value == '77')
      {
        this.translate.setDefaultLang('ml')
        this.translate.use('ml')
        localStorage.setItem('language', 'ml')  
        localStorage.setItem('Lang_id', e.detail.value)  
      }
      else if(e.detail.value == '76')
      {
        this.translate.setDefaultLang('ma')
        this.translate.use('ma')
        localStorage.setItem('language', 'ma')  
        localStorage.setItem('Lang_id', e.detail.value)  
      }
      else if(e.detail.value == '43')
      {
        this.translate.setDefaultLang('cr')
        this.translate.use('cr')
        localStorage.setItem('language', 'cr')  
        localStorage.setItem('Lang_id', e.detail.value)  
      }
      else if(e.detail.value == '27')
      {
        this.translate.setDefaultLang('sp')
        this.translate.use('sp')
        localStorage.setItem('language', 'sp')  
        localStorage.setItem('Lang_id', e.detail.value)  
      }
      else if(e.detail.value == '6')
      {
        this.translate.setDefaultLang('ar')
        this.translate.use('ar')
        localStorage.setItem('language', 'ar')  
        localStorage.setItem('Lang_id', e.detail.value)  
      }
      else if(e.detail.value == '89')
    {
      this.translate.setDefaultLang('po')
      this.translate.use('po')
      localStorage.setItem('language', 'po')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '93')
    {
      this.translate.setDefaultLang('ro')
      this.translate.use('ro')
      localStorage.setItem('language', 'ro')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '64')
    {
      this.translate.setDefaultLang('ki')
      this.translate.use('ki')
      localStorage.setItem('language', 'ki')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '107')
    {
      this.translate.setDefaultLang('sr')
      this.translate.use('sr')
      localStorage.setItem('language', 'sr')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '126')
    {
      this.translate.setDefaultLang('uk')
      this.translate.use('uk')
      localStorage.setItem('language', 'uk')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
  }
}
