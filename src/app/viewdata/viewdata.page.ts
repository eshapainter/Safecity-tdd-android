import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-viewdata',
  templateUrl: './viewdata.page.html',
  styleUrls: ['./viewdata.page.scss'],
})
export class ViewdataPage implements OnInit {
url
  constructor(public sanitizer: DomSanitizer) { 
  
  }

  ngOnInit() {
    this.url =   this.sanitizer.bypassSecurityTrustResourceUrl('https://datastudio.google.com/reporting/3dbf7e20-ecf0-4c9e-983f-0d006978098b/page/p_o9kgdqlvlc')
  console.log(this.url)
  }

  openurl()
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://datastudio.google.com/reporting/3dbf7e20-ecf0-4c9e-983f-0d006978098b/page/p_o9kgdqlvlc')
  }

}
